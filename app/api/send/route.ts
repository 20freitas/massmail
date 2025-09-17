import { NextRequest } from 'next/server';
import { globalLimiter } from '@/lib/rateLimiter';
import { sendEmail } from '@/lib/mailer';
import { SendRequestPayload, SendProgressEvent } from '@/lib/types';
import { getProgressBus } from '@/lib/progressBus';

export const dynamic = 'force-dynamic';

// Maintain a singleton progress bus in memory (per server process)
const bus = getProgressBus();

export async function POST(req: NextRequest) {
  let data: SendRequestPayload;
  try {
    data = (await req.json()) as SendRequestPayload;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }
  const { emails, subject, body, delayMs, gmailUser, gmailAppPassword } = data;

  if (!emails?.length) {
    return new Response(JSON.stringify({ error: 'Empty email list' }), { status: 400 });
  }
  if (emails.length > 500) {
    return new Response(JSON.stringify({ error: 'Maximum 500 emails per send' }), { status: 400 });
  }
  if (!gmailUser || !gmailAppPassword) {
    return new Response(JSON.stringify({ error: 'Gmail credentials missing' }), { status: 400 });
  }
  if (!subject?.trim()) {
    return new Response(JSON.stringify({ error: 'Subject required' }), { status: 400 });
  }
  if (!body?.trim()) {
    return new Response(JSON.stringify({ error: 'Body required' }), { status: 400 });
  }

  const startEvent: SendProgressEvent = {
    type: 'start',
    total: emails.length,
    timestamp: Date.now()
  };
  bus.publish(startEvent);

  (async () => {
    let index = 0;
    for (const email of emails) {
      if (!globalLimiter.canSend()) {
  bus.publish({ type: 'error', error: 'Daily limit reached', timestamp: Date.now() });
        break;
      }
      try {
        await sendEmail({ user: gmailUser, appPassword: gmailAppPassword }, email, subject, body);
        globalLimiter.increment();
        const state = globalLimiter.getState();
  bus.publish({
          type: 'item',
          index,
          email,
          total: emails.length,
          timestamp: Date.now(),
          remaining: state.remaining
        });
      } catch (e: any) {
  bus.publish({
          type: 'error',
          index,
          email,
          error: e.message || 'Unknown error',
          timestamp: Date.now()
        });
      }
      index++;
      if (delayMs > 0) await new Promise(r => setTimeout(r, delayMs));
    }
  bus.publish({ type: 'done', timestamp: Date.now() });
  })().catch(e => {
    bus.publish({ type: 'error', error: 'Internal failure: ' + (e?.message || e), timestamp: Date.now() });
    bus.publish({ type: 'done', timestamp: Date.now() });
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

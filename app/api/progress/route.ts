import { NextRequest } from 'next/server';
import { getProgressBus } from '@/lib/progressBus';

export const dynamic = 'force-dynamic';

const bus = getProgressBus();

export async function GET(_req: NextRequest) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const send = (data: any) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      // send existing history immediately
      for (const evt of bus.getHistory()) send(evt);
      const handlers = {
        start: (e: any) => send(e),
        item: (e: any) => send(e),
        error: (e: any) => send(e),
        done: (e: any) => send(e)
      };
      (['start','item','error','done'] as const).forEach(t => bus.on(t as any, handlers[t]));
      // keepalive pings every 15s
      const ka = setInterval(() => controller.enqueue(encoder.encode(':keepalive\n\n')), 15000);
      // close logic not strictly necessary; SSE stays open
      // we do not remove listeners to keep logs flowing across connections; could remove on close.
      // When underlying network closes, interval is GC'd.
    }
  });
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  });
}

"use client";
import { useEffect, useState, useRef } from 'react';
import { SendProgressEvent } from '@/lib/types';

interface LogLine extends SendProgressEvent { ts: string }

export function ProgressLog() {
  const [events, setEvents] = useState<LogLine[]>([]);
  const [status, setStatus] = useState<'connecting' | 'open' | 'error'>('connecting');
  const [height, setHeight] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const evts: LogLine[] = [];
    const es = new EventSource('/api/progress');
    es.onopen = () => setStatus('open');
    es.onerror = () => {
      setStatus('error');
      // basic reconnection attempt after short delay
      setTimeout(() => {
        if (es.readyState === EventSource.CLOSED) {
          const retry = new EventSource('/api/progress');
          retry.onmessage = es.onmessage!;
          retry.onopen = () => setStatus('open');
          retry.onerror = () => setStatus('error');
        }
      }, 1500);
    };
    es.onmessage = (msg) => {
      try {
        const data: SendProgressEvent = JSON.parse(msg.data);
        const now = new Date();
        const ts = now.toLocaleTimeString('en-US', { hour12: false });
        evts.push({ ...data, ts });
        setEvents([...evts]);
        // auto scroll to bottom
        requestAnimationFrame(() => {
          const el = scrollRef.current; if (el) el.scrollTop = el.scrollHeight;
        });
      } catch {}
    };
    return () => es.close();
  }, []);

  // Match height with left form card
  useEffect(() => {
    const form = document.getElementById('send-form-card');
    if (!form) return;
    const update = () => setHeight(form.getBoundingClientRect().height);
    update();
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(() => update());
      ro.observe(form);
      return () => ro.disconnect();
    } else {
      const id = setInterval(update, 800);
      return () => clearInterval(id);
    }
  }, []);

  return (
    <div className="relative flex flex-col rounded-2xl border border-slate-200 bg-[#0d1117] shadow-sm overflow-hidden h-full" style={height ? { height } : { minHeight: '400px' }}>
      <div className="px-4 pt-4 pb-3 border-b border-slate-200/40 bg-[#0d1117] flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_1px_rgba(0,0,0,.6)]"></span>
        <h2 className="text-sm font-semibold tracking-tight text-slate-100">Feedback</h2>
        <span className="ml-auto text-[10px] text-slate-500">
          {status === 'connecting' && 'Connecting...'}
          {status === 'open' && 'Real-time logs'}
          {status === 'error' && 'Reconnecting...'}
        </span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-auto px-3 py-2 space-y-0.5 font-mono text-sm leading-relaxed">
        {events.map((e, i) => {
          let cls = 'text-slate-400';
          if (e.type === 'item') cls = 'text-emerald-400';
          if (e.type === 'error') cls = 'text-red-400';
          if (e.type === 'done') cls = 'text-emerald-300 font-semibold';
          if (e.type === 'start') cls = 'text-cyan-300';
          return (
            <div key={i} className={cls}>
              <span className="text-slate-600">{e.ts}&nbsp;</span>
              {e.type === 'start' && <span>&gt; Starting batch total={e.total}</span>}
              {e.type === 'item' && <span>&gt; [{e.index! + 1}/{e.total}] {e.email} OK (remaining {e.remaining})</span>}
              {e.type === 'error' && <span>&gt; ERROR [{e.index}] {e.email} - {e.error}</span>}
              {e.type === 'done' && <span>&gt; Completed ✔</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

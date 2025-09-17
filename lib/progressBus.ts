import EventEmitter from 'eventemitter3';
import { SendProgressEvent } from './types';

type EventMap = {
  start: SendProgressEvent;
  item: SendProgressEvent;
  error: SendProgressEvent;
  done: SendProgressEvent;
};

export class ProgressBus extends EventEmitter<EventMap> {
  private history: SendProgressEvent[] = [];
  private maxHistory = 1000;
  publish(event: SendProgressEvent) {
    super.emit(event.type as keyof EventMap, event);
    // store in history (shallow)
    this.history.push({ ...event });
    if (this.history.length > this.maxHistory) this.history.splice(0, this.history.length - this.maxHistory);
  }
  onAny(cb: (e: SendProgressEvent) => void) {
    (['start','item','error','done'] as (keyof EventMap)[]).forEach(t => this.on(t, cb));
  }
  getHistory() { return [...this.history]; }
}

// Guarantee a single instance across hot reloads / route modules.
const g = globalThis as any;
if (!g.__progressBus) g.__progressBus = new ProgressBus();
export function getProgressBus() { return g.__progressBus as ProgressBus; }

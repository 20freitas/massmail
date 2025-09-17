export class DailyRateLimiter {
  private count: number = 0;
  private lastReset: Date = new Date();
  constructor(private dailyLimit: number) {}

  canSend() {
    this.resetIfNeeded();
    return this.count < this.dailyLimit;
  }
  increment() {
    this.resetIfNeeded();
    this.count++;
  }
  getState() {
    this.resetIfNeeded();
    return { count: this.count, remaining: this.dailyLimit - this.count };
  }
  private resetIfNeeded() {
    const now = new Date();
    if (now.getDate() !== this.lastReset.getDate()) {
      this.count = 0;
      this.lastReset = now;
    }
  }
}

export const globalLimiter = new DailyRateLimiter(500);

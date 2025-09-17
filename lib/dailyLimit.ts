// Daily email limit system
interface DailyLimit {
  date: string;
  count: number;
}

class DailyLimitManager {
  private storageKey = 'mass-mail-daily-limit';
  
  private getTodayKey(): string {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  }
  
  private getStorageData(): DailyLimit | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
  
  private setStorageData(data: DailyLimit): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch {
      // Silent fail if localStorage is not available
    }
  }
  
  getCurrentCount(): number {
    const today = this.getTodayKey();
    const data = this.getStorageData();
    
    // If there's no data or it's a different day, return 0
    if (!data || data.date !== today) {
      return 0;
    }
    
    return data.count;
  }
  
  // Alias for getCurrentCount with clearer naming
  getTodayCount(): number {
    return this.getCurrentCount();
  }
  
  addToCount(amount: number): void {
    const today = this.getTodayKey();
    const currentData = this.getStorageData();
    
    if (!currentData || currentData.date !== today) {
      // New day or first use
      this.setStorageData({ date: today, count: amount });
    } else {
      // Same day, add to counter
      this.setStorageData({ 
        date: today, 
        count: currentData.count + amount 
      });
    }
  }
  
  canSendEmails(amount: number): boolean {
    const currentCount = this.getCurrentCount();
    return (currentCount + amount) <= 500;
  }
  
  getRemainingCount(): number {
    const currentCount = this.getCurrentCount();
    return Math.max(0, 500 - currentCount);
  }
  
  getUsagePercentage(): number {
    const currentCount = this.getCurrentCount();
    return Math.min(100, (currentCount / 500) * 100);
  }
}

export const dailyLimitManager = new DailyLimitManager();

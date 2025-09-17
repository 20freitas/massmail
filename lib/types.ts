export interface SendRequestPayload {
  emails: string[];
  subject: string;
  body: string; // HTML or text
  delayMs: number;
  gmailUser: string;
  gmailAppPassword: string;
}

export interface SendProgressEvent {
  type: 'start' | 'item' | 'error' | 'done';
  index?: number;
  total?: number;
  email?: string;
  error?: string;
  timestamp: number;
  remaining?: number;
}

export interface Notification {
  timestamp?: number;
  type: 'success' | 'warning' | 'error' | 'info' | 'normal';
  title: string;
  body: string;
  status?: 'open' | 'closed' /* | ... */;
}

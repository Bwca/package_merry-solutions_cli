export interface Message {
  text: string;
  type: 'info' | 'error' | 'success' | 'prompt';
}

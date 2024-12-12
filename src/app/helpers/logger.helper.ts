import { environment } from '../../environments/environment';

export class Logger {
  static log(...messages: any): void {
    !environment.production && console.log(...messages);
  }

  static error(...messages: any): void {
    !environment.production && console.error(...messages);
  }

  static warn(...messages: any): void {
    !environment.production && console.warn(...messages);
  }
}

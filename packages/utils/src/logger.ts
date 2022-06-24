// @internal
export interface ILogger {
  info(msg: string): void;
  success(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
}

// @internal
export class Logger implements ILogger {
  private colors = {
    reset: '\x1b[0m',
    fg: {
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
    },
  } as const;

  private packageName: string;

  constructor(packageName: string) {
    this.packageName = packageName;
  }

  private toArray(msg: string | string[]) {
    return Array.isArray(msg) ? msg : [msg];
  }

  private log(msg: string | string[], prefix: string = '') {
    const s = Array.isArray(msg) ? msg.join('\n') : msg;
    // eslint-disable-next-line no-console
    console.log(`%s${this.packageName}:%s ${s}\n`, prefix, prefix ? this.colors.reset : '');
  }

  info(msg: string | string[]) {
    this.log(msg);
  }

  success(msg: string | string[]) {
    this.log(msg, this.colors.fg.green);
  }

  warn(msg: string | string[]) {
    this.log(['Skipped!', ...this.toArray(msg)], this.colors.fg.yellow);
  }

  error(msg: string | string[]) {
    this.log(['Failed!', ...this.toArray(msg)], this.colors.fg.red);
  }
}

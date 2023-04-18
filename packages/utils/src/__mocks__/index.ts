import { vi } from 'vitest';
export {
  isObjectEmpty,
  isValidHostname,
  isValidHttpUrl,
  isValidUrlEx,
  isValidUrl,
  isFileExistsSync,
  isDirExists,
  cloneDeep,
  getErrorMessage,
} from '../index';
export type { ILogger } from '../index';

export const Logger: any = vi.fn().mockImplementation(() => ({
  warn: vi.fn(),
  error: vi.fn(),
  success: vi.fn(),
  info: vi.fn(),
}));

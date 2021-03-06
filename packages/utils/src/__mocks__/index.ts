import { vi } from 'vitest';

export {
  isObjectEmpty,
  isValidHostname,
  isValidHttpUrl,
  isValidUrlEx,
  isValidUrl,
  isFileExistsSync,
  isDirExists,
  ILogger,
  cloneDeep,
  loadConfig,
  getErrorMessage,
} from '../index';

export const Logger = vi.fn().mockImplementation(() => ({
  warn: vi.fn(),
  error: vi.fn(),
  success: vi.fn(),
  info: vi.fn(),
}));

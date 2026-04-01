import { SYSTEM_TITLE } from '../config/constants';

export function logInfo(message: string): void {
  console.log(`${SYSTEM_TITLE} | ${message}`);
}

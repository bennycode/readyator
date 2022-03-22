import {NumberOrString} from './NumberOrString';

/**
 * Based on the input it returns a list of URLs to check.
 */
export function parseUrls(input: NumberOrString | NumberOrString[]): string[] {
  const inputString = Array.isArray(input) ? input.join(',') : `${input}`;
  if (inputString.length === 0) {
    return [];
  }
  return inputString.split(',').map(port => (isNaN(port as unknown as number) ? port : `http://localhost:${port}/`));
}

export function logMessage(message: string, isError: boolean = false, ...args: any[]) {
  const logFunction = isError ? console.error : console.log;
  logFunction(`Readyator: ${message}`, ...args);
}

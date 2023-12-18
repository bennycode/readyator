import {ExecException, exec} from 'child_process';
import {logMessage} from './logMessage';

/** @see https://docs.docker.com/engine/reference/commandline/ps/#filtering */
export enum HealthCheckStatus {
  HEALTHY = 'healthy',
  NONE = 'none',
  STARTING = 'starting',
  UNHEALTHY = 'unhealthy',
}

let intervalHandle: NodeJS.Timeout;

export const runWhenHealthy = (
  instanceId: string,
  interval: string = '1000',
  onSuccess: Function = () => process.exit(0),
  onError: Function = () => process.exit(1)
): void => {
  const intervalInMillis = parseInt(interval, 10);

  exec(
    `docker inspect -f {{.State.Health.Status}} ${instanceId}`,
    (error: ExecException | null, stdout: string, stderr: string) => {
      if (intervalHandle) {
        clearInterval(intervalHandle);
      }
      if (error) {
        logMessage(`Failed to check health status for "${instanceId}": ${stderr}`, true, error);
        onError();
      } else if (stdout.trim() === HealthCheckStatus.HEALTHY) {
        logMessage(`Instance "${instanceId}" is healthy.`);
        onSuccess();
      } else {
        logMessage(`Waiting for instance "${instanceId}" to become healthy... Current state: ${stdout}`);
        intervalHandle = setInterval(() => runWhenHealthy(instanceId, interval), intervalInMillis);
      }
    }
  );
};

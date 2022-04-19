import {ExecException, exec} from 'child_process';

let intervalHandle: NodeJS.Timer;

export const checkHealthStatus = (containerName: string, healthCheckInterval: number) => {
  exec(
    `docker inspect -f {{.State.Health.Status}} ${containerName}`,
    (error: ExecException | null, stdout: string, stderr: string) => {
      if (intervalHandle) {
        clearInterval(intervalHandle);
      }
      if (error) {
        console.error(`Failed to check health status for "${containerName}": ${stderr}`, error);
        process.exit(1);
      } else if (stdout.trim() === 'healthy') {
        console.log(`Container "${containerName}" is ready.`);
        process.exit(0);
      } else {
        console.log(`Waiting for container "${containerName}" to get ready...`);
        intervalHandle = setInterval(() => checkHealthStatus(containerName, healthCheckInterval), healthCheckInterval);
      }
    }
  );
};

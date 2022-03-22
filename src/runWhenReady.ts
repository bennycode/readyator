import axios from 'axios';
import axiosRetry from 'axios-retry';
import {exec, ExecException} from 'child_process';

axiosRetry(axios, {retries: Number.MAX_SAFE_INTEGER, retryDelay: () => 1_000});

export function runWhenReady(ports: string, command: string): Promise<void> {
  const portChecks = ports.split(',').map(port => axios.get(`http://localhost:${port}`));

  return Promise.all(portChecks).then(() => {
    exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        throw error;
      } else if (stdout) {
        console.log(stdout);
      } else {
        console.error(stderr);
      }
    });
  });
}

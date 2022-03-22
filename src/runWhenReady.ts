import axios, {AxiosError} from 'axios';
import axiosRetry from 'axios-retry';
import {exec, ExecException} from 'child_process';

axiosRetry(axios, {
  retries: Number.MAX_SAFE_INTEGER,
});

export function runWhenReady(input: string, command: string, interval: string = '1000'): Promise<void> {
  const intervalInMillis = parseInt(interval, 10);
  const urlChecks = input
    .split(',')
    .map(port => (isNaN(port as unknown as number) ? port : `http://localhost:${port}/`))
    .map(url =>
      axios.get(url, {
        'axios-retry': {
          retryDelay: (retryCount: number, error: AxiosError) => {
            console.log(`Waiting for "${error.config.url}" to come online (#${retryCount}): ${error.message}`);
            return intervalInMillis;
          },
        },
      })
    );

  return Promise.all(urlChecks).then(() => {
    console.log(`All urls/ports available. Running "${command}"...`);
    exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        throw error;
      } else if (stdout) {
        process.stdout.write(stdout);
      } else {
        process.stderr.write(stderr);
      }
    });
  });
}

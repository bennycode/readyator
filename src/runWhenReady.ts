import axios, {AxiosError} from 'axios';
import axiosRetry from 'axios-retry';
import {exec} from 'child_process';
import {parseUrls} from './parseUrls';
import {NumberOrString} from './NumberOrString';

axiosRetry(axios, {
  retries: Number.MAX_SAFE_INTEGER,
});

function runWhenReady(
  input: NumberOrString | NumberOrString[],
  command: string | Function,
  interval: string = '1000'
): Promise<void> {
  const intervalInMillis = parseInt(interval, 10);
  const urls = parseUrls(input);
  const urlChecks = urls.map(url =>
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
    console.log(`All urls/ports available.`);
    if (typeof command === 'function') {
      console.log(`Running callback function "${command.name}"...`);
      command();
    } else {
      console.log(`Running "${command}"...`);
      const child = exec(command);
      child.stdout?.on('data', data => {
        process.stdout.write(data);
      });
    }
  });
}

export {runWhenReady};

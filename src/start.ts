#!/usr/bin/env node

import {runWhenReady} from './runWhenReady';

const [ports, command, interval, containerName] = process.argv.slice(2);

runWhenReady(ports, command, interval, containerName).catch(error => {
  throw error;
});

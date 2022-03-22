#!/usr/bin/env node

import {runWhenReady} from './runWhenReady';

const [ports, command, interval] = process.argv.slice(2);

runWhenReady(ports, command, interval).catch(error => {
  throw error;
});

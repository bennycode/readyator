#!/usr/bin/env node

import {runWhenReady} from './runWhenReady';

const [ports, command] = process.argv.slice(2);

runWhenReady(ports, command).catch(error => {
  throw error;
});

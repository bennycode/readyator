#!/usr/bin/env node

import {runWhenHealthy} from './runWhenHealthy';

const [instanceId, interval] = process.argv.slice(2);

runWhenHealthy(instanceId, interval);

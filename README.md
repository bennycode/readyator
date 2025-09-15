# Readyator

![Language Details](https://img.shields.io/github/languages/top/bennycode/readyator) ![License](https://img.shields.io/npm/l/readyator.svg) ![Dependency Updates](https://img.shields.io/librariesio/release/npm/readyator.svg) ![Package Version](https://img.shields.io/npm/v/readyator.svg)

Waits for specified `urls` or `ports` on localhost to be ready before running a supplied command.

## Features

- **More reliable than sleep:** Actually checks if services are responding
- **Faster execution:** Continues as soon as ready (no fixed wait)
- **Better error handling:** Fails fast if services don't start
- **More professional:** Industry-standard approach for service dependencies

## Pratical Example

Before:

```yml
./dev/up
sleep 5  # Hope services are ready
npm test
```

After:

```yml
./dev/up readyator 5555,5556,3000,5558 "npm test"
```

## Installation

### npm

```bash
npm install readyator
```

### Yarn

```bash
yarn add readyator
```

## Usage

### Preface

- Addresses (`ports` or `urls`) must be separated by comma if you want to check for multiple services to be ready ( returning a successful HTTP status code).
- Your `command` must be surrounded by quotes so that it can be properly parsed.
- The default check interval is 1s (1000ms) but can be changed.

### Wait for ports

Command:

```bash
readyator [ports] [command]
```

Example:

```bash
readyator 8080,8081 "npm run start"
```

If you're not looking to perform any specific actions but simply want to determine when the service is available, use this command:

```bash
readyator 8080,8081 "exit 0"
```

### Wait for URLs

Command:

```bash
readyator [urls] [command]
```

Example:

```bash
readyator https://www.google.com/,http://localhost:8081/ "npm run start"
```

### Change check interval

Command:

```bash
readyator [urls] [command] [interval_in_millis]
```

Example:

```bash
readyator https://www.google.com/ "npm run start" 5000
```

### Wait for healthy Docker container

Command:

```bash
readyator-docker [container_name] [interval_in_millis]
```

Example:

```bash
readyator-docker my_docker_container 1000
```

### Node.js API

You can use `readyator` also through its Node.js API:

```ts
import readyator from 'readyator';

await readyator([8080, 8081], 'npm run start');
```

It also supports executing a callback function:

```ts
import readyator from 'readyator';

const callback = () => {
  console.log('System is online!');
};

readyator([8080, 8081], callback);
```

Readyator's programmatic interface can also be used to listen for Docker containers to become healthy:

```ts
import {runWhenHealthy} from 'readyator';

await runWhenHealthy('my_docker_container');
```

## Development

Here is how you can easily test the `readyator` from your development environment when checking out the code:

```bash
npm start https://www.google.com/ "npm run exit"
```

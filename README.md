# Readyator

Waits for specified `urls` or `ports` on localhost to be ready before running a supplied command.

## Preface

- Addresses (`ports` or `urls`) must be separated by comma if you want to check for multiple services to be ready ( returning a successful HTTP status code).
- Your `command` must be surrounded by quotes so that it can be properly parsed.
- The default check interval is 1s (1000ms) but can be changed.

## Usage

### Wait for ports

Command:

```bash
readyator [ports] [command]
```

Example:

```bash
readyator 8080,8081 "npm run start"
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

### Node.js API

You can use **Readyator** also through its Node.js API:

```ts
import {runWhenReady} from 'readyator';

await runWhenReady([8080, 8081], 'npm run start');
```

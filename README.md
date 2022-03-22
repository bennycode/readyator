# Readyator

Waits for localhost ports to be ready before running a supplied command.

## Usage

### CLI

```bash
readyator [ports] [command]
```

### Example

```bash
readyator 8080,8081 "npm run start"
```

**Notes:** Ports must be separated by comma if you want to wait for multiple ports to be ready (returning a successful HTTP status code). Your command must be surrounded by quotes so that it can be properly parsed.

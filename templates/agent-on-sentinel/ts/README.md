# Agent on Sentinel — TypeScript Starter

A minimal Naylence starter template featuring:

- **EchoAgent** — a simple agent hosted on a sentinel that echoes back any payload
- **CLI Client** — a command-line client that sends a message and prints the response

This is the simplest possible distributed setup: the agent runs directly on a sentinel node, and the client connects to it. Perfect for learning the basics before exploring more complex topologies.

> ⚠️ **Note:** This starter does not include security features. See [Next Steps](#next-steps) for production-ready configurations.

---

## Project Structure

```
.
├── src/
│   ├── echo-agent.ts   # Agent implementation (edit this!)
│   ├── client.ts       # CLI client
│   └── common.ts       # Shared constants (agent address)
├── compose.yaml        # Docker Compose for containerized setup
├── package.json        # Dependencies and npm scripts
├── tsconfig.json       # TypeScript configuration
├── .env.agent          # Agent/sentinel environment variables
├── .env.client         # Client environment variables
└── README.md           # You are here
```

---

## QuickStart (Docker)

> **Requirements:** Docker, Docker Compose, Node.js 18+

### 1. Install dependencies and build

```bash
npm install
npm run build
```
Environment files are initialized by the generator. If you cloned this template
directly, create them from the templates:

```bash
cp .env.agent.template .env.agent
cp .env.client.template .env.client
```

### 2. Start the agent

```bash
docker compose up -d agent
```

This starts a sentinel on port 8000 with the EchoAgent registered.

### 3. Run the client

```bash
docker compose run --rm client
```

**Expected output:**
```
Hello, World!
```

### 4. Stop when done

```bash
docker compose down
```

### Verbose mode (see envelope traffic)

```bash
FAME_SHOW_ENVELOPES=true docker compose up agent
```

---

## QuickStart (No Docker)

> **Requirements:** Node.js 18+

### 1. Install dependencies and build

```bash
npm install
npm run build
```

### 2. Start the agent (Terminal 1)

```bash
npm run dev
```

You'll see:
```
```

### 3. Run the client (Terminal 2)

```bash
npm run client
```

**Expected output:**
```
Hello, World!
```

### 4. Smoke test

A one-liner to verify the agent is responding correctly:

```bash
npm run smoke
```

**Expected output:**
```
Hello, World!
✓ Smoke test passed
```

---

## What to Edit First

### 1. Agent logic

Open [src/echo-agent.ts](src/echo-agent.ts) and modify the `runTask` method:

```typescript
async runTask(payload: any): Promise<any> {
  // Replace this with your own logic!
  // Examples:
  // - Transform the payload
  // - Call external APIs
  // - Process data
  return payload;  // Currently just echoes back
}
```

### 2. Client request

Open [src/client.ts](src/client.ts) to change what the client sends:

```typescript
const result = await remote.runTask("Hello, World!");
// Change "Hello, World!" to any data your agent expects
```

### 3. Agent address

Edit [src/common.ts](src/common.ts) to change the logical address:

```typescript
export const AGENT_ADDR = "echo@fame.fabric";
// Change to: "myagent@fame.fabric" or any valid address
```

---

## Environment Variables

The generator creates `.env.agent` and `.env.client` from the templates.
If you cloned this template directly, use:

```bash
cp .env.agent.template .env.agent   # Agent/sentinel configuration
cp .env.client.template .env.client # Client configuration
```

### Agent Environment (`.env.agent`)

| Variable | Default | Description |
|----------|---------|-------------|
| `FAME_LISTENER_PORT` | `8000` | Port for all sentinel listeners |
| `FAME_LOG_LEVEL` | `info` | Logging: debug, info, warn, error |
| `FAME_SHOW_ENVELOPES` | `false` | Show envelope traffic (debugging) |

### Client Environment (`.env.client`)

| Variable | Default | Description |
|----------|---------|-------------|
| `FAME_LISTENER_PORT` | `8000` | Port for the sentinel (keep URL in sync) |
| `FAME_DIRECT_ADMISSION_URL` | `ws://localhost:8000/...` | Client connection URL |
| `FAME_LOG_LEVEL` | `warning` | Logging: debug, info, warn, error |
| `FAME_SHOW_ENVELOPES` | `false` | Show envelope traffic (debugging)

## Troubleshooting

### Port already in use

If port 8000 is taken, change `FAME_LISTENER_PORT`:

```bash
# Docker
FAME_LISTENER_PORT=9000 docker compose up -d agent

# No-Docker
FAME_LISTENER_PORT=9000 npm run dev
```

Update the client URL accordingly:
```bash
FAME_DIRECT_ADMISSION_URL="ws://localhost:9000/fame/v1/attach/ws/downstream" ...
```

### Client can't connect

- **Docker:** Make sure the agent is healthy: `docker compose ps`
- **No-Docker:** Ensure the agent is running in another terminal
- Check the URL matches the port the sentinel is using

### Connection refused / timeout

The agent may still be starting. Wait a few seconds or check logs:

```bash
# Docker
docker compose logs agent

# No-Docker
# Check the terminal where `npm run dev` is running
```

### Build errors

```bash
npm run clean
npm install
npm run build
```

---

## Next Steps

Once you're comfortable with this starter, explore:

- **[Security examples](https://github.com/naylence/naylence-examples-ts/tree/main/examples/security)** — Add authentication and encryption
- **[Multi-agent example](https://github.com/naylence/naylence-examples-ts/tree/main/examples/distributed/multi-agent)** — Multiple agents communicating
- **[Browser client](https://github.com/naylence/naylence-examples-ts/tree/main/examples/react/multi-agent-workflow-with-backend/browser)** — React-based client UI

---

## License

Apache-2.0

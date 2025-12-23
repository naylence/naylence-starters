# Agent on Sentinel - Python Starter

A minimal Naylence starter template featuring:

- **EchoAgent** - a simple agent hosted on a sentinel that echoes back any payload
- **CLI Client** - a command-line client that sends a message and prints the response

This is the simplest possible distributed setup: the agent runs directly on a sentinel node, and the client connects to it. Perfect for learning the basics before exploring more complex topologies.

> **Note:** This starter does not include security features. It is intentionally minimal for learning purposes.

---

## Project Structure

```
./echo_agent.py        # Agent implementation (edit this!)
./client.py            # CLI client
./common.py            # Shared constants (agent address)
./compose.yaml         # Docker Compose for containerized setup
./requirements.txt     # Python dependencies
./.env.agent           # Agent/sentinel environment variables
./.env.client          # Client environment variables
./README.md            # You are here
```

---

## QuickStart (Docker)

> **Requirements:** Docker, Docker Compose

### 1. Start the agent

```bash
docker compose up -d agent
```

This starts a sentinel on port 8000 with the EchoAgent registered.

### 2. Run the client

```bash
docker compose run --rm client
```

**Expected output:**
```
Hello, World!
```

### 3. Stop when done

```bash
docker compose down
```

### Verbose mode (see envelope traffic)

```bash
FAME_SHOW_ENVELOPES=true docker compose up agent
```

---

## QuickStart (No Docker)

> **Requirements:** Python 3.12+

### 1. Install dependencies

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Environment files are initialized by the generator. If you cloned this template
directly, create them from the templates:

```bash
cp .env.agent.template .env.agent
cp .env.client.template .env.client
```

### 2. Start the agent (Terminal 1)

```bash
python echo_agent.py
```

### 3. Run the client (Terminal 2)

```bash
. .venv/bin/activate
python client.py
```

**Expected output:**
```
Hello, World!
```

---

## What to Edit First

### 1. Agent logic

Open [echo_agent.py](echo_agent.py) and modify `run_task`:

```python
async def run_task(self, payload: Any, id: Any) -> Any:
    # Replace this with your own logic!
    # Examples:
    # - Transform the payload
    # - Call external APIs
    # - Process data
    return payload  # Currently just echoes back
```

### 2. Client request

Open [client.py](client.py) to change what the client sends:

```python
result = await remote.run_task("Hello, World!")
# Change "Hello, World!" to any data your agent expects
```

### 3. Agent address

Edit [common.py](common.py) to change the logical address:

```python
AGENT_ADDR = "echo@fame.fabric"
# Change to: "myagent@fame.fabric" or any valid address
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
| `FAME_DIRECT_ADMISSION_URL` | `ws://localhost:8000/...` | Client connection URL |
| `FAME_LOG_LEVEL` | `warning` | Logging: debug, info, warning, error |
| `FAME_SHOW_ENVELOPES` | `false` | Show envelope traffic (debugging) |

---

## Troubleshooting

### Port already in use

If port 8000 is taken, change `FAME_LISTENER_PORT`:

```bash
# Docker
FAME_LISTENER_PORT=9000 docker compose up -d agent

# No-Docker
FAME_LISTENER_PORT=9000 python echo_agent.py
```

Update the client URL accordingly:
```bash
FAME_DIRECT_ADMISSION_URL="ws://localhost:9000/fame/v1/attach/ws/downstream" python client.py
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
```

### Dependency errors

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

---

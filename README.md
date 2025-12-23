# Naylence Starters

Starter templates for Naylence projects. This repo is consumed by the `naylence-create` CLI to scaffold new projects.

## Repo layout

- `templates/<templateId>/<flavor>/...` - Template sources
- `templates/manifest.json` - Template catalog with friendly names and descriptions

## Template catalog (manifest)

The CLI reads `templates/manifest.json` when present to show human-friendly names and descriptions. If the manifest is missing or invalid, the CLI falls back to scanning the directory structure.

Manifest schema (brief):

```json
{
  "version": 1,
  "templates": [
    {
      "id": "agent-on-sentinel",
      "name": "Agent on Sentinel",
      "description": "Starter agent with Sentinel runtime and client scaffolding.",
      "flavors": [
        {
          "id": "ts",
          "path": "ts",
          "nextSteps": ["npm install", "npm run build", "npm run dev"]
        },
        {
          "id": "py",
          "path": "py",
          "nextSteps": [
            "python -m venv .venv",
            "source .venv/bin/activate",
            "pip install -r requirements.txt",
            "python echo_agent.py"
          ]
        }
      ],
      "order": 1
    }
  ]
}
```

Note: `flavors` is an array of objects. Each flavor can carry its own `nextSteps`.

## Adding a new template

1. Create the directory: `templates/<templateId>/<flavor>/...`
2. Add an entry to `templates/manifest.json` with `id`, `name`, `description`, and `flavors`.
3. Keep the `id` stable; it is the internal identifier used by the CLI.

## Local usage with the CLI

Point the CLI at a local starters checkout:

```bash
NAYLENCE_STARTERS_PATH=/path/to/naylence-starters naylence-create --list
```

To scaffold interactively:

```bash
NAYLENCE_STARTERS_PATH=/path/to/naylence-starters naylence-create my-project
```

## Notes

- Directory names are stable IDs; friendly names live only in the manifest.
- Use `order` in the manifest to control ordering in prompts and `--list` output.

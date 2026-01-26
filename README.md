# {{PROJECT_NAME}}

{{DESCRIPTION}}

## Quick Start

```bash
# Install dependencies
pnpm install
cd server && pnpm install && cd ..

# Start development
pnpm dev          # Start widget dev server on :4444
cd server && pnpm start  # Start MCP server on :8000

# Build for production
pnpm build
```

## Project Structure

```
.
├── server/               # MCP Server
│   ├── src/
│   │   ├── server.ts    # Main server entry point
│   │   └── types.ts     # Zod schemas and types
│   └── package.json
├── src/                  # Widget Components
│   ├── components/       # Widget implementations
│   │   └── {widget}/
│   │       └── index.tsx
│   ├── types.ts          # OpenAI globals types
│   ├── use-*.ts          # Shared hooks
│   └── index.css         # Global styles
├── assets/               # Built widget bundles (gitignored)
├── package.json
└── vite.config.mts
```

## Development

### Adding a New Widget

1. Create a new directory: `src/components/{widget-name}/`
2. Add an `index.tsx` file with your React component
3. The build system will automatically detect and bundle it
4. Add the corresponding tool in `server/src/server.ts`

### Environment Variables

Copy `.env.example` to `.env` and configure:

- `PORT` - Server port (default: 8000)
- `API_BASE_URL` - Your backend API URL
- `ASSETS_BASE_URL` - Public URL for widget assets (production)

## Deployment

Build and deploy using the included Dockerfile:

```bash
docker build -t {{PROJECT_NAME}} .
docker run -p 8000:8000 {{PROJECT_NAME}}
```

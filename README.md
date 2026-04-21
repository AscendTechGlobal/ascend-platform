## Development

Run the local development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production on a VPS

1. Install Node.js `20.9+`.
2. Copy `.env.example` to `.env` or `.env.local` and fill in the real values.
3. Install dependencies with `npm ci`.
4. Validate and build with `npm run build:prod`.
5. Start the app with `npm run start:prod`.

Useful scripts:

- `npm run check` runs ESLint and TypeScript checks.
- `npm run build:prod` runs checks and creates the production build.
- `npm run start:prod` serves the app on `0.0.0.0:${PORT:-3000}`.

Recommended process manager on a VPS: PM2 or `systemd`.

Example:

```bash
npm ci
npm run build:prod
PORT=3000 HOSTNAME=0.0.0.0 npm run start:prod
```

## Notes

- Supabase keys are required for the application to boot correctly.
- Upstash Redis variables are optional; if omitted, rate limiting falls back to in-memory storage.

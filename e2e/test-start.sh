#!/usr/bin/env bash
set -e

PORT=3000

# Kill any process using port 3000
if lsof -i :$PORT >/dev/null 2>&1; then
  echo "Killing process on port $PORT..."
  lsof -ti :$PORT | xargs kill -9
fi

# Start Turbo dev in foreground so Playwright can manage the process
echo "Starting Turbo dev server..."
exec pnpm turbo run dev --filter=web 

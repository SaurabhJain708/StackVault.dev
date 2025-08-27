#!/usr/bin/env bash
set -euo pipefail

PORT=3000

echo "Killing any process on port $PORT..."
# -k kills the process, -n tcp specifies TCP port, -9 force kill, -v verbose
fuser -k -n tcp $PORT -v || true

# Wait a moment to ensure port is free
sleep 1
if fuser -n tcp $PORT >/dev/null 2>&1; then
  echo "Port $PORT is still in use, aborting..."
  fuser -v -n tcp $PORT
  exit 1
fi

# Start Turbo dev server with logs streamed
echo "Starting Turbo dev server..."
pnpm turbo run dev --filter=web --cache=local:r,remote:r > >(tee /dev/tty) 2> >(tee /dev/tty >&2) &
SERVER_PID=$!

# Ensure server is killed on script exit
trap "echo 'Stopping Turbo server...'; kill -9 $SERVER_PID || true" EXIT

# Wait for server to be ready
echo "Waiting for server on port $PORT..."
until nc -z localhost $PORT; do
  sleep 1
done

echo "Server ready on port $PORT (PID=$SERVER_PID)"
wait $SERVER_PID


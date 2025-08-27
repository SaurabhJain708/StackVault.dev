#!/usr/bin/env bash
set -euo pipefail

PORT=3000

echo "Killing any process on port $PORT..."
fuser -k -n tcp $PORT -v || true
sleep 1

if fuser -n tcp $PORT >/dev/null 2>&1; then
  echo "Port $PORT is still in use, aborting..."
  fuser -v -n tcp $PORT
  exit 1
fi

echo "Starting Turbo dev server..."
pnpm turbo run dev --filter=web --output-logs=full --no-daemon &
SERVER_PID=$!

# Ensure server is killed on script exit
trap "echo 'Stopping Turbo server...'; kill -9 $SERVER_PID || true" EXIT

# Wait for server to be ready
echo "Waiting for server on port $PORT..."
until nc -z localhost $PORT; do
  sleep 1
done

echo "Server ready on port $PORT (PID=$SERVER_PID)"

# Wait for Turbo dev process to exit (keeps script running)
wait $SERVER_PID

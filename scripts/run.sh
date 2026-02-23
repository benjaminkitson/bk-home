#!/usr/bin/env bash
set -e

SCRIPT_NAME="$1"
if [ -z "$SCRIPT_NAME" ]; then
  echo "Usage: npm run script <fileName>"
  echo "  Example: npm run script capture-thumbnails"
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Build scripts/*.ts -> scripts/build/*.js with tsc
npx tsc -p scripts/tsconfig.json

RUNNER="scripts/build/${SCRIPT_NAME}.js"
if [ ! -f "$RUNNER" ]; then
  echo "Error: $RUNNER not found. Is scripts/${SCRIPT_NAME}.ts present?"
  exit 1
fi

node "$RUNNER" "${@:2}"

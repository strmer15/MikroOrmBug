#!/bin/bash
set -eEu -o pipefail

docker-compose -f "docker-compose.yml" up -d db-test

pnpm compile

NODE_ENV=test pnpm db:migrate

#!/bin/bash
set -eEu -o pipefail

docker-compose --profile test -f "docker-compose.yml" \
  down \
  --volumes \
  --rmi local \
  ;

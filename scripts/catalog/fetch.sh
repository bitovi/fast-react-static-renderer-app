#!/bin/bash
set -e
echo "Fetching the catalog"

NODE_OPTIONS="-r dotenv/config -r cross-fetch/polyfill" ts-node ./scripts/catalog/fetch-contentful.ts
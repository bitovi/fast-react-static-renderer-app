#!/bin/bash
set -e
echo "Fetching the catalog"

NODE_OPTIONS="-r dotenv/config -r cross-fetch/polyfill" $BUILD_CONTENTS_DIRECTORY/node_modules/.bin/ts-node ./scripts/catalog/fetch-contentful.ts
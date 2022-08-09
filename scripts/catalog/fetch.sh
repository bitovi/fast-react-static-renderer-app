#!/bin/bash
set -e
echo "Fetching the catalog"

cd $BUILD_CONTENTS_DIRECTORY
echo "Running 'npm run fetch-catalog'"
npm run fetch-catalog
cd -
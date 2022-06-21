#!/bin/bash

set -e

echo "running the build"

node_modules/next/dist/bin/next build && node_modules/next/dist/bin/next export


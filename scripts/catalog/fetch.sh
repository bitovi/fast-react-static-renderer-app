#!/bin/bash

set -e


# CURL APPROACH (works)
CONTENTFUL_URL="https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}"
CURL_RESPONSE="$(curl "$CONTENTFUL_URL" \
-s \
-X POST \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${CONTENTFUL_ACCESS_TOKEN}" \
-d '{"query":"query{pageCollection {items { title slug }}}"}')"
echo "$CURL_RESPONSE" | jq -r -c -M "{pages: .data.pageCollection.items}"
# END CURL APPROACH
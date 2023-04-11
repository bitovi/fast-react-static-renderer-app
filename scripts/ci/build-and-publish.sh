#!/bin/bash

## This pipeline is for phase 1 (in-github build)

set -e


# ###
# ### PUBLISH - environment setup
# ###

# Defining the Default branch variable
if [ -z "$DEFAULT_BRANCH" ]; then
    DEFAULT_BRANCH="main"
fi

# Defining the Branch name variable
TAG_OR_HEAD="$(echo $GITHUB_REF | cut -d / -f2)"
BRANCH_OR_TAG_NAME=$(echo $GITHUB_REF | cut -d / -f3)
echo "TAG_OR_HEAD: $TAG_OR_HEAD"
echo "BRANCH_OR_TAG_NAME: $BRANCH_OR_TAG_NAME"


# if tag, use tag
# if default branch, use `latest`
# if otherwise, use branch name
if [ -z "$APP_VERSION" ]; then
  if [ -n "$USE_COMMIT_HASH_FOR_ARTIFACTS" ]; then
    APP_VERSION="$GITHUB_SHA"
  else
    if [ "$TAG_OR_HEAD" == "tags" ]; then
      APP_VERSION="$BRANCH_OR_TAG_NAME"
    elif [ "$TAG_OR_HEAD" == "heads" ] && [ "$BRANCH_OR_TAG_NAME" == "$DEFAULT_BRANCH" ]; then
      APP_VERSION="latest"
    elif [ "$TAG_OR_HEAD" == "pull" ]; then
      APP_VERSION="pr-${BRANCH_OR_TAG_NAME}"
    else
      APP_VERSION="$BRANCH_OR_TAG_NAME"
    fi
  fi
fi


npm i next
npm run build



BUILD_DIRECTORY="${GITHUB_WORKSPACE}/out"


# PUBLISH_S3_BUCKET
S3_PATH_PREFIX="react/${APP_VERSION}"
S3_FULL_PATH="${PUBLISH_S3_BUCKET}/${S3_PATH_PREFIX}"

echo "push to s3:"
echo "PUBLISH_S3_BUCKET: $PUBLISH_S3_BUCKET"
echo "S3_PATH_PREFIX: $S3_PATH_PREFIX"
echo "S3_FULL_PATH: $S3_FULL_PATH"

aws s3 sync $BUILD_DIRECTORY s3://$S3_FULL_PATH --delete
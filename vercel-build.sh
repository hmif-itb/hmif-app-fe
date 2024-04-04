#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

# only build if it is from pull request or from develop or main branch
if [[ "$VERCEL_GIT_PULL_REQUEST_ID" != "" || "$VERCEL_GIT_COMMIT_REF" == "develop" || "$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then
  # Proceed with the build
    echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi
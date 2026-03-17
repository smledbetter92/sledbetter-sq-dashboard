#!/bin/bash

# Blockcell deployment script for veeo-seller-dashboard
# Builds the Vite app and uploads to https://blockcell.sqprod.co

set -e

SITE_NAME="online-dashboard"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="$PROJECT_DIR/dist"
ZIP_PATH="$PROJECT_DIR/site.zip"
UPLOAD_URL="https://blockcell.sqprod.co/api/v1/sites/$SITE_NAME/upload"

echo "Building project..."
cd "$PROJECT_DIR"
npm run build

if [ ! -d "$BUILD_DIR" ]; then
  echo "Error: Build failed - dist/ not found."
  exit 1
fi

echo "Creating archive (contents of dist/)..."
rm -f "$ZIP_PATH"
cd "$BUILD_DIR"
zip -r -q "$ZIP_PATH" . -x "*.DS_Store"
cd "$PROJECT_DIR"

echo "Uploading to Blockcell ($UPLOAD_URL)..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$UPLOAD_URL" \
  -H "Accept: application/json" \
  -F "file=@$ZIP_PATH")

HTTP_BODY=$(echo "$RESPONSE" | sed '$d')
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)

rm -f "$ZIP_PATH"

echo "Response (HTTP $HTTP_CODE): $HTTP_BODY"

if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
  echo "Deployment completed successfully."
else
  echo "Deployment may have failed. Check the response above."
  exit 1
fi

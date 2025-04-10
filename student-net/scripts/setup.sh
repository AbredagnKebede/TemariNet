#!/bin/bash

# Install dependencies at the root level
echo "Installing dependencies..."
pnpm install

# Generate Prisma client
echo "Generating Prisma client..."
cd packages/database
pnpm db:generate

# Build all packages
echo "Building shared packages..."
cd ../..
pnpm build --filter=@student-net/config --filter=@student-net/utils --filter=@student-net/validation --filter=@student-net/database --filter=@student-net/ui

echo "Setup complete! You can now start the development server with 'pnpm dev'"
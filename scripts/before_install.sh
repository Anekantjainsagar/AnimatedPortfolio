#!/bin/bash

# before_install.sh - Prepare the environment before installing the application

# Update system packages
apt update -y

# Install Node.js 18.x if not already installed
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verify Node.js and npm installation
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Install PM2 globally for process management
npm install -g pm2

# Create application directory if it doesn't exist
mkdir -p /src

# Remove old application files if they exist
if [ -d "/src" ]; then
    echo "Cleaning up old application files..."
    rm -rf /src/*
fi

# Stop any existing PM2 processes
pm2 stop all || true
pm2 delete all || true

echo "Before install completed successfully"
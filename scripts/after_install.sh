#!/bin/bash

# after_install.sh - Configure the application after installation

# Navigate to the application directory
cd /src

# Set proper ownership and permissions
chown -R ubuntu:ubuntu /src
chmod -R 755 /src

# Install dependencies
echo "Installing npm dependencies..."
sudo -u ubuntu npm install --production

# Build the React application
echo "Building React application..."
sudo -u ubuntu npm run build

# Install serve globally to serve the built React app
npm install -g serve

# Create a simple ecosystem file for PM2
cat > /src/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'react-app',
    script: 'serve',
    args: ['-s', 'build', '-l', '3000'],
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Set ownership for the ecosystem file
chown ubuntu:ubuntu /src/ecosystem.config.js

echo "After install completed successfully"
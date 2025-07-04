#!/bin/bash

# start_server.sh - Start the React application server

# Navigate to the application directory
cd /src

# Start the application using PM2
echo "Starting React application with PM2..."
sudo -u ec2-user pm2 start ecosystem.config.js

# Save PM2 process list and set up auto-restart on boot
sudo -u ec2-user pm2 save
sudo -u ec2-user pm2 startup

# Check if the application is running
sleep 5

# Verify the application is running
if sudo -u ec2-user pm2 list | grep -q "react-app"; then
    echo "React application started successfully"
    sudo -u ec2-user pm2 status
else
    echo "Failed to start React application"
    exit 1
fi

# Optional: Check if the application is responding on port 3000
echo "Checking if application is responding on port 3000..."
timeout 30 bash -c 'until curl -f http://localhost:3000 > /dev/null 2>&1; do sleep 1; done'

if [ $? -eq 0 ]; then
    echo "Application is responding on port 3000"
else
    echo "Warning: Application may not be responding on port 3000"
fi

echo "Server start completed"
#!/bin/bash

echo "Updating Arma 3 Launcher..."

# Pull latest changes
git pull

# Pull latest Docker image
docker compose pull

# Restart containers with new image
docker compose down
docker compose up -d

echo "Update complete! The launcher has been updated and restarted." 
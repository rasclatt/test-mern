#!/bin/sh

# Create the mongo-data directory if it doesn't exist
mkdir -p /data/db

# Change permissions to ensure MongoDB can write to the directory
chmod -R 777 /data/db

# Start MongoDB
exec mongod
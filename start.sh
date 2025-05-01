#!/bin/bash

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Function to start a service
start_service() {
    local dir=$1
    local port=$2
    local name=$3
    
    echo "Starting $name..."
    cd $dir
    if check_port $port; then
        echo "Port $port is already in use. $name might already be running."
    else
        npm run dev &
        echo "$name started on port $port"
    fi
    cd ..
}

# Create .env file if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env file..."
    echo "PORT=5000" > backend/.env
fi

# Start backend
start_service "backend" 5000 "Backend server"

# Start frontend
start_service "frontend" 3000 "Frontend server"

echo "Both servers are starting up..."
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API will be available at: http://localhost:5000"

# Keep the script running
wait

cd backend && npm install && cd ../frontend && npm install && cd .. 
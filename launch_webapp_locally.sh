#!/usr/bin/env zsh
BACKEND_PORT=5123
CLIENT_PORT=5173
BOLD="\033[1m"
UNBOLD="\033[0m"
#echo -e "$BOLD--- Building the Docker images... $UNBOLD \n\n"
#docker build -t imran-salim/subtrack-backend Deployment/Backend
#docker build -t imran-salim/subtrack-client Deployment/Client
echo -e "$BOLD--- Building and running services... $UNBOLD\n\n"
docker compose up -d backend
docker compose up -d client

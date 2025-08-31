#!/bin/sh
corepack enable
yarn set version berry

cd backend
yarn
yarn build

cd ../frontend
yarn
yarn build

docker-compose up

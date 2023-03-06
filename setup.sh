#! /bin/bash
echo Setting up smartchat
sudo apt update
sudo apt install -y nodejs
sudo apt install -y npm
sudo apt install -y libgbm-dev libasound-dev libnss3-dev libatk1.0-0 libatk-bridge2.0-0 libcups2 libxcomposite-dev libxdamage-dev
sudo apt install -y libasound2 libatk1.0-0 libc6 libcairo2
sudo apt install -y libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4
sudo apt install -y libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0
sudo apt install -y libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1
sudo apt install -y libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1
sudo apt install -y libxss1 libxtst6 ca-certificates fonts-liberation libnss3 lsb-release
sudo apt install -y xdg-utils wget
echo "OPENAI_API_KEY=$1" > ./.env
exec cat ./.env
npm install
npm start
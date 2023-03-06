FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./apikey.sh ./

COPY . .

ENV GPTKEY=EMPTY

RUN npm install

RUN apt update
RUN apt install -y libgbm-dev libasound-dev libnss3-dev libatk1.0-0 libatk-bridge2.0-0 libcups2 libxcomposite-dev libxdamage-dev
RUN apt install -y libasound2 libatk1.0-0 libc6 libcairo2
RUN apt install -y libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4
RUN apt install -y libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0
RUN apt install -y libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1
RUN apt install -y libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1
RUN apt install -y libxss1 libxtst6 ca-certificates fonts-liberation libnss3 lsb-release
RUN apt install -y xdg-utils wget

EXPOSE 7000
RUN chmod +x ./apikey.sh
ENTRYPOINT [ "./apikey.sh" ]
CMD ["$GPTKEY"]

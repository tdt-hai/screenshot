FROM node:18-slim
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
USER root
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends
RUN apt-get update && apt-get install gnupg wget libxss1  dbus dbus-x11 -y && \
    wget https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_125.0.6422.60-1_amd64.deb && \
RUN apt-get install -y ./google-chrome-stable_125.0.6422.60-1_amd64.deb
RUN rm -rf /var/lib/apt/lists/*
COPY /fonts /usr/share/fonts

ENV PORT 3000
ENV HOST "localhost"
EXPOSE 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
VOLUME /usr/src/app/image
CMD ["npm","run","prod"]

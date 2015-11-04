FROM codestuffers/node-base:5

COPY package.json /var/app/
WORKDIR /var/app
RUN npm install --production --loglevel warn
COPY src /var/app/src/
WORKDIR /var/app/src

CMD ["node", "app.js"]

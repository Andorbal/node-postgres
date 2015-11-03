FROM codestuffers/node-base:5

COPY package.json /var/app/
WORKDIR /var/app
RUN npm install
COPY out /var/app/out/
WORKDIR /var/app/out

CMD ["node", "app.js"]

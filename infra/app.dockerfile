FROM codestuffers/node-base:5

WORKDIR /var/app
COPY node_modules node_modules/
COPY out out

CMD ["node", "out/app.js"]

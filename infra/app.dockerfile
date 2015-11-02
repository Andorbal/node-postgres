FROM codestuffers/node-base:5

WORKDIR /var/app
COPY node_modules /node_modules/
COPY out /

ENTRYPOINT ["node"]

CMD ["/app.js"]

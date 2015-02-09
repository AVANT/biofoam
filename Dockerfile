FROM avant/nodejs:0.10.35
MAINTAINER cedric@avant.org

ENV SRC /biofoam

WORKDIR $SRC

# this is cached unless package.json changes
ADD package.json $SRC/package.json
RUN npm install

# ENV PATH $PATH:/$SRC/node_modules

ADD ./scripts/docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]



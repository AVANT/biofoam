FROM debian:wheezy
MAINTAINER che@avant.org

## Install nodejs.

ENV NODE_VERSION v0.10.35

RUN export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y update \
  && apt-get -y --no-install-recommends install \
    python \
    build-essential \
    git \
    ca-certificates \
    python-pip \
  && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade awscli

RUN mkdir /nodejs
RUN wget -O- --no-check-certificate http://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1

ADD / /biofoam

WORKDIR /biofoam

RUN npm install \
  && npm cache clean

EXPOSE 3000

ENTRYPOINT entrypoint

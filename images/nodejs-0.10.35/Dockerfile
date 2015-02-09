FROM debian:wheezy
MAINTAINER che@avant.org

RUN export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y update \
  && apt-get -y --no-install-recommends install \
    python \
    build-essential \
    git \
    ca-certificates \
    python-pip \
    wget \
  && rm -rf /var/lib/apt/lists/*

## Install nodejs.
ENV NODE_VERSION v0.10.35
RUN mkdir /nodejs
RUN wget -O- --no-check-certificate http://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1
ENV PATH $PATH:/nodejs/bin

# add nodejs entrypoint and help cmd?

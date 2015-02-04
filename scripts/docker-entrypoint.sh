#! /bin/bash


error(){
  echo "error: $@" >&2
  exit 1
}

usage() {
  echo "Usage: $(basename $0) [dev|package]"
  exit 0
}

dev() {
  cd $WORKING_DIRECTORY
  npm install
  npm start
}

package() {
  [[ $AWS_SECRET_ACCESS_KEY ]] || error "AWS_SECRET_ACCESS_KEY is not defined"
  [[ $AWS_ACCESS_KEY_ID ]] || error "AWS_ACCESS_KEY_ID is not defined"
  cd $WORKING_DIRECTORY
  npm install || error "npm install failed"
  tar czf dist.latest.tar.gz _dist || error "tar failed"
  aws s3 cp dist.latest.tar.gz s3://fanny-pack/frontend/releases/dist.latest.tar.gz || error "aws push failed"
}

###
## MAIN
#

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd $(dirname $DIR)

case $1 in

  dev)
    dev
  ;;
  package)
    package
  ;;
  *)
    usage
  ;;
esac

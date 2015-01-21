#! /bin/bash


error(){
  echo "error: $@" >&2
  exit 1
}

usage() {
  echo "$(basename $0) [dev|package]"
  exit 0
}

dev() {
  npm start
}

package() {
  [[ $AWS_SECRET_ACCESS_KEY ]] || error "AWS_SECRET_ACCESS_KEY is not defined"
  [[ $AWS_ACCESS_KEY_ID ]] || error "AWS_ACCESS_KEY_ID is not defined"
  npm install || error "npm install failed"
  tar czf dist.latest.tar.gz /biofoam/_dist || error "tar failed"
  aws s3 cp dist.latest.tar.gz s3://fanny-pack/frontend/releases/dist.latest.tar.gz || error "aws push failed"
}

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

# This script is here to automatically set your local node version to the correct version

#! /bin/bash

if hash nvm 2>/dev/null
then
  echo "Setting nvm environment to use node v0.10.35"
  nvm use 0.10.35
elif hash n 2>/dev/null
then
  echo "Setting n environment to use node v0.10.35"
  n 0.10.35
elif hash nodenv 2>/dev/null
then
  echo "Setting nodenv environment to use node v0.10.35"
  nodenv local 0.10.35 # not tested
fi

# TODO's:
# - set up script local variable for "0.8.12"
# - set up script local variable for setting env message
# - set up script to read in node version from package.json file (just grep it)

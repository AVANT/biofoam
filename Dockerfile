FROM avant/nodejs:0.10.35
MAINTAINER cedric@avant.org

ENV SRC /biofoam

WORKDIR $SRC

# add dependency tracking files
ADD package.json $SRC/package.json
ADD bower.json $SRC/bower.json
RUN npm install --unsafe-perm

# cause gulpfile has to live in root
ADD gulpfile.js $SRC/gulpfile.js

# add our entrypoint script
ENTRYPOINT ["npm"]
CMD ["start"]



#!/bin/bash

TARGET=dev-server-name:/path/to/site/
if [ "$1" == "production" ] ; then
  TARGET=production-server-name:/path/to/site/
elif [ "$1" == "dev" ] ; then
  TARGET=dev-server-name:/path/to/site/
fi

echo "deploying to: $TARGET"
# rsync -rvc --delete dist/ "$TARGET"

# added '2>&1' to force all the errors from rsync that normally
# output to standard error (i.e. named pipe 2) and make them output
# to standard out (i.e. named pipe &1), now we grep for all rsync
# errors that simply have to do with setting permissions and
# remove those lines from the output
# ---------------------------------------
# rsync -rvcp --chmod=g+w dist/ "$TARGET" 2>&1 | grep -v 'rsync: failed to set permissions on'
# ---------------------------------------


# starts shell and before rsyncing files, we run the 'umask 002'
# command. which is equivalent 'chmod 777' on all the new files then
# rsyncing them over
rsync -rvc --rsync-path="umask 002 && rsync" dist/ "$TARGET"

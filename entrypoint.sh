#!/bin/bash
if [ ! -f /data/.initialized ]; then
    yarn populate-db
    touch ./data/.initialized
fi

exec yarn dev 
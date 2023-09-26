#!/bin/bash
if [ ! -f /data/.initialized ]; then
    bun populate-db
    touch ./data/.initialized
fi

exec bun dev 
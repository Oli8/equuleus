#!/bin/bash

# set the user by running in your terminal
# export EQUULEUS_USER="user" 
# change with your server username

if [ -z ${EQUULEUS_USER} ]; then 
	echo "EQUULEUS_USER is not set";
	exit 1
fi

ssh -A "$EQUULEUS_USER@jerome-crete.me" << EOF
	cd /var/www/html/equuleus
	git pull
EOF

echo "Equuleus has been updated."

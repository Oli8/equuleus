#!/bin/bash

if [ -z ${1} ]; then
	echo "EQUULEUS_USER is not set";
	echo "Usage : ./deploy.sh username"
	exit 1
fi

ssh -A "$1@jerome-crete.me" << EOF
	cd /var/www/html/equuleus
	git pull
EOF

echo "Equuleus has been updated."
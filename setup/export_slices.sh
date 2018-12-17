#!/bin/bash

PS_HTML_FILE=$1
OUT_FILE=$2

awk '/;">$/{printf $0" ";next;}1' $PS_HTML_FILE | sed 's/.*left:\([0-9]*px\).*top:\([0-9]*px\).*width:\([0-9]*px\).*height:\([0-9]*px\).*src="images\/\(.*.jpg\)".*/{image:"\5", left:"\1", top:"\2", width:"\3", height:"\4"}/g' | grep "^{" | paste -sd "," - | sed -e 's/^\({.*}\)$/module.exports.slices = [\1];/g' > $OUT_FILE

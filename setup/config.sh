#!/bin/bash
HTML_FILE=$1

sh export_slices.sh $HTML_FILE slices.js
node generate_mappings.js


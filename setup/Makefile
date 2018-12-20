.DEFAULT_GOAL := image_config

SRC_DIR=../src
RESOURCES_DIR=../resources
SLICES_HTML=slices.html

slices:
	sh export_slices.sh $(SLICES_HTML) slices.json

tokens: slices
	node generate_tokens.js slices.json tokens.json

install: image_config tokens
	cp image_config.js $(SRC_DIR)
	mkdir -p $(RESOURCES_DIR)
	cp tokens.json $(RESOURCES_DIR)

image_config: tokens slices
	node generate_image_config.js slices.json tokens.json image_config.js

.PHONY=clean

clean:
	rm -f slices.json tokens.json image_config.js

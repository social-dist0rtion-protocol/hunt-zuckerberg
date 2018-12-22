.DEFAULT_GOAL := image_config

SRC_DIR=../src
RESOURCES_DIR=../src/resources
SLICES_HTML=slices.html

slices:
	sh export_slices.sh $(SLICES_HTML) $(RESOURCES_DIR)/slices.json

tokens: slices
	node generate_tokens.js $(RESOURCES_DIR)/slices.json $(RESOURCES_DIR)/tokens.json

resources_dir:
	mkdir -p $(RESOURCES_DIR)

install: resources_dir tokens image_config

image_config: tokens slices
	node generate_image_config.js $(RESOURCES_DIR)/slices.json $(RESOURCES_DIR)/tokens.json $(RESOURCES_DIR)/image_config.json

.PHONY=clean

clean:
	rm -f $(RESOURCES_DIR)/slices.json $(RESOURCES_DIR)/tokens.json $(RESOURCES_DIR)/image_config.json

.DEFAULT_GOAL := image_config

IPFS_NODE_IP=52.213.170.144
IPFS_DATA_DIR=$(HOME)/.ipfs_data
SRC_DIR=$(shell cd .. && pwd)/src
RESOURCES_DIR=$(SRC_DIR)/resources
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

build: install
	cd ../ && npm run build

deploy: build
	cp -rf ../build .
	sh deploy.sh build $(IPFS_NODE_IP)

.PHONY=clean

clean:
	rm -rf build build.tar

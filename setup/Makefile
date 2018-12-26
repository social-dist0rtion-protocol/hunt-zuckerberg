.DEFAULT_GOAL := image_config

STAGE ?= base
GITHUB_PAGES_ACCOUNT=social-dist0rtion-protocol
IPFS_NODE_IP=34.245.87.179
IPFS_DATA_DIR=$(HOME)/.ipfs_data
SRC_DIR=$(shell cd .. && pwd)/src
RESOURCES_DIR=$(SRC_DIR)/resources
SLICES_HTML=slices.html

slices:
	sh export_slices.sh $(SLICES_HTML) $(RESOURCES_DIR)/slices.json

tokens: slices
	node generate_tokens.js $(RESOURCES_DIR)/slices.json $(RESOURCES_DIR)/tokens.json diobestia

resources_dir:
	mkdir -p $(RESOURCES_DIR)

install: resources_dir tokens image_config

image_config: tokens slices
	node generate_image_config.js $(RESOURCES_DIR)/slices.json $(RESOURCES_DIR)/tokens.json $(RESOURCES_DIR)/image_config.json

contracts:
	cp -rf ../ethereum/contracts $(RESOURCES_DIR)

build: node_package install contracts
	cd ../ && npm run build

node_package:
	@cd ../ && penv $(STAGE)

deploy_ipfs: build
	cp -rf ../build .
	sh deploy.sh build $(IPFS_NODE_IP)

deploy_base: build
	@ls $(GITHUB_PAGES_ACCOUNT).github.io || git clone git@github.com:$(GITHUB_PAGES_ACCOUNT)/$(GITHUB_PAGES_ACCOUNT).github.io.git
	cd $(GITHUB_PAGES_ACCOUNT).github.io && git pull
	@cp -rf ../build/* $(GITHUB_PAGES_ACCOUNT).github.io/
	@cd $(GITHUB_PAGES_ACCOUNT).github.io && git add * && git commit -m "auto update" && git push || true

deploy: deploy_$(STAGE)
	@echo "Deployment done."

.PHONY=clean

clean:
	rm -rf build build.tar $(GITHUB_PAGES_ACCOUNT).github.io

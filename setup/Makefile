.DEFAULT_GOAL := generate_game

SEED ?= test
STAGE ?= github
GITHUB_PAGES_ACCOUNT=social-dist0rtion-protocol
IPFS_NODE_IP=34.245.87.179
IPFS_DATA_DIR=$(HOME)/.ipfs_data
SRC_DIR=$(shell cd .. && pwd)/src
RESOURCES_DIR=$(SRC_DIR)/resources
SLICES_HTML=slices.html
NO_COLOR=\033[0m
GREEN_COLOR=\033[0;32m

seed:
	@openssl rand -hex 16

slices:
	@echo "Export image slices to $(GREEN_COLOR)$(RESOURCES_DIR)/slices.json$(NO_COLOR)"
	@sh export_slices.sh $(SLICES_HTML) $(RESOURCES_DIR)/slices.json

qrcodes:
	@node generate_qrcodes $(RESOURCES_DIR)/tokens.json

tokens: slices
	@echo "Generate tokens using seed $(GREEN_COLOR)$(SEED)$(NO_COLOR)"
	@node generate_tokens.js $(RESOURCES_DIR)/slices.json $(RESOURCES_DIR)/tokens.json $(SEED)

resources_dir:
	@mkdir -p $(RESOURCES_DIR)

generate_game: resources_dir tokens image_config

image_config: tokens slices
	@echo "Generate image configuration in $(GREEN_COLOR)$(RESOURCES_DIR)/image_config.json$(NO_COLOR)"
	@node generate_image_config.js $(RESOURCES_DIR)/slices.json $(RESOURCES_DIR)/tokens.json $(RESOURCES_DIR)/image_config.json

contracts:
	cp -rf ../ethereum/contracts $(RESOURCES_DIR)

build: generate_game contracts
	cd ../ && npm run build

deploy_ipfs: build
	cp -rf ../build .
	sh deploy.sh build $(IPFS_NODE_IP)

deploy_github: build
	@ls $(GITHUB_PAGES_ACCOUNT).github.io || git clone git@github.com:$(GITHUB_PAGES_ACCOUNT)/$(GITHUB_PAGES_ACCOUNT).github.io.git
	cd $(GITHUB_PAGES_ACCOUNT).github.io && git pull
	@cp -rf ../build/* $(GITHUB_PAGES_ACCOUNT).github.io/
	@cd $(GITHUB_PAGES_ACCOUNT).github.io && git add * && git commit -m "auto update" && git push || true

deploy: deploy_$(STAGE)
	@echo "Deployment done."

.PHONY=clean

clean:
	rm -rf build build.tar $(GITHUB_PAGES_ACCOUNT).github.io

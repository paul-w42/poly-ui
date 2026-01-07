# Variables
PACKAGE_NAME = poly-ui
TGZ_FILES = $(wildcard $(PACKAGE_NAME)*.tgz)
DEST_DIR = ../demo-app-react

# Colors for output
GREEN = \033[0;32m
NC = \033[0m

.PHONY: all clean build pack copy

# Default target (runs everything)
all: clean build pack copy

clean:
	@echo -e "\n${GREEN}--------------------------------------------"
	@echo -e "Removing old package file ..."
	@echo -e "--------------------------------------------${NC}\n"
	rm -f $(PACKAGE_NAME)*.tgz

build:
	@echo -e "\n${GREEN}--------------------------------------------"
	@echo -e "Building Package ..."
	@echo -e "--------------------------------------------${NC}\n"
	npm run build

pack:
	@echo -e "\n${GREEN}--------------------------------------------"
	@echo -e "Packaging ..."
	@echo -e "--------------------------------------------${NC}\n"
	npm pack

copy:
	@echo -e "\n${GREEN}--------------------------------------------"
	@echo -e "Copying to $(DEST_DIR) ..."
	@echo -e "--------------------------------------------${NC}\n"
	cp -f $(PACKAGE_NAME)*.tgz $(DEST_DIR)

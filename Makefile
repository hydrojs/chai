all: test

# Install

install: node_modules components browser

# Browser build

browser: node_modules components
	@./node_modules/.bin/component-build -s hydro-chai -o .
	@mv build.js hydro-chai.js

# Development

build: components
	@./node_modules/.bin/component-build --dev

test: test-node

test-node:
	@./node_modules/.bin/hydro

# Clean

clean: clean-node clean-browser clean-components clean-cov

clean-node:
	@rm -rf node_modules

clean-browser:
	@rm -f hydro-chai.js

clean-components:
	@rm -rf build
	@rm -rf components

clean-cov:
	@rm -rf coverage

# CI

ci: test-node coveralls

coveralls:
	@./node_modules/.bin/istanbul cover ./node_modules/.bin/_hydro --report lcovonly -- \
		&& cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

# Support

components: node_modules component.json
	@./node_modules/.bin/component-install --dev

node_modules: package.json
	@npm install

.PHONY: all browser node_modules coverage

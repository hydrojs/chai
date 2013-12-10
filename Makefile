all: test

# Make standalone browser build

browser: node_modules components
	@./node_modules/.bin/component-build -s hydro-chai -o .
	@mv build.js hydro-chai.js

# Development

build: components
	@./node_modules/.bin/component-build --dev

release: build browser test
	@git changelog

# CI

test:
	@npm test

coveralls:
	@./node_modules/.bin/istanbul cover ./node_modules/.bin/_hydro --report lcovonly -- \
		&& cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

# Support

components: node_modules component.json
	@./node_modules/.bin/component-install --dev

.PHONY: all test coverage browser

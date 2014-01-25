test('global', function() {
  sassert(chai);
});

test('styles', function() {
  sassert(should);
  sassert(expect);
  sassert(assert);
});

test('stack', function() {
  sassert(chai.Assertion.includeStack);
});

test('showDiff', function() {
  sassert(chai.Assertion.showDiff);
});

test('plugins', function() {
  sassert(chai.spy);
});

test('should', function() {
  should.not.exist(null);
});

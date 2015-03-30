import Ember from 'ember';
import {
  module,
  test
  } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Simple', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /simple', function(assert) {
  visit('/simple');
  andThen(function() {
    assert.equal(currentPath(), 'simple');
    assert.deepEqual(text('.ember-table-table-row:eq(0) .ember-table-cell'), ['Open', 'Close', 'Total'], "header shows correct columns names");
    assert.deepEqual(text('.ember-table-table-row:eq(1) .ember-table-cell'), ['100', '125', '225'], "first row matches expected values");
  });
});


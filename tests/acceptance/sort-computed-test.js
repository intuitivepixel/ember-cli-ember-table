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

test('visiting /sort-computed', function(assert) {
  visit('/sort-computed');
  andThen(function() {
    assert.equal(currentPath(), 'sort-computed');
    assert.deepEqual(text('.ember-table-table-row:eq(0) .ember-table-cell'), ['Open', 'Close', 'Total'], "header shows correct columns names");
    assert.deepEqual(text('.ember-table-table-row:eq(1) .ember-table-cell'), ['100', '125', '225'], "first row matches expected values");
  });

  // changes sort to Close
  click('.ember-table-cell:contains("Close") .ember-table-content');
  // make Close descending
  click('.ember-table-cell:contains("Close") .ember-table-content');
  andThen(function() {
    assert.deepEqual(text('.ember-table-table-row:eq(1) .ember-table-cell'), ['25075', '25100', '50175'], "clicking header reverses the sort of table content");
  });
});

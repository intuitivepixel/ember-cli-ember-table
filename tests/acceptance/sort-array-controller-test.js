import Ember from 'ember';
import {
  module,
  test,
  skip
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

/**
 * TODO: Figure out why content not being updated when content is sorted with ArrayController
 */
skip('visiting /sort-array-controller', function(assert) {
  visit('/sort-array-controller');
  andThen(function() {
    assert.equal(currentPath(), 'sort-array-controller');
    assert.deepEqual(text('.ember-table-table-row:eq(0) .ember-table-cell'), ['Open', 'Close', 'Total'], "header shows correct columns names");
    assert.deepEqual(text('.ember-table-table-row:eq(1) .ember-table-cell'), ['100', '125', '225'], "first row matches expected values");
  });

  // changes sort to Close
  click('.ember-table-cell:contains("Close") .ember-table-content');
  // make Close descending
  click('.ember-table-cell:contains("Close") .ember-table-content');
  andThen(function() {
    assert.deepEqual(text('.ember-table-table-row:eq(1) .ember-table-cell'), ['24925', '24950', '49875'], "clicking header reverses the sort of table content");
  });
});

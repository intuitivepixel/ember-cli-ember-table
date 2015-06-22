import Ember from 'ember';
import {
  module,
  test
  } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Fixed', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /fixed', function(assert) {
  visit('/fixed');
  andThen(function() {
    assert.equal(currentPath(), 'fixed');
    assert.deepEqual(text('.ember-table-left-table-block .ember-table-table-row:eq(0) .ember-table-cell'), ['Item Name'], "header shows Item Name in fixed column");
    assert.deepEqual(text('.ember-table-right-table-block .ember-table-table-row:eq(0) .ember-table-cell'), ['Open', 'Close', 'Total'], "header shows correct columns");
    assert.deepEqual(text('.ember-table-left-table-block .ember-table-table-row:eq(1) .ember-table-cell'), ['Item 0'], "first row is called Item 0");
    assert.deepEqual(text('.ember-table-right-table-block .ember-table-table-row:eq(1) .ember-table-cell'), ['100', '125', '225'], "first row matches expected values");
  });
});

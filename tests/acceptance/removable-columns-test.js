import Ember from 'ember';
import {
  module,
  test
  } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Removable Columns', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /removable-columns', function(assert) {
  visit('/removable-columns');
  andThen(function() {
    assert.equal(currentPath(), 'removable-columns');
    assert.deepEqual(text('.ember-table-table-row:eq(0) .ember-table-cell'), ['Item Name', 'Open', 'Close', 'Total'], "header shows correct columns names");
    assert.deepEqual(text('.ember-table-table-row:eq(1) .ember-table-cell'), ['Item 0', '100', '125', '225'], "first row matches expected values");
  });
  click('.hide-column.Open');
  andThen(function(){
    assert.deepEqual(text('.ember-table-table-row:eq(0) .ember-table-cell'), ['Item Name', 'Close', 'Total'], "Open column was remove from column names");
    assert.deepEqual(text('.ember-table-table-row:eq(1) .ember-table-cell'), ['Item 0', '125', '225'], "Open column value was removed");
  });
  click('.show-column.Open');
  andThen(function(){
    assert.deepEqual(text('.ember-table-table-row:eq(0) .ember-table-cell'), ['Item Name', 'Open', 'Close', 'Total'], "Open was re-added");
    assert.deepEqual(text('.ember-table-table-row:eq(1) .ember-table-cell'), ['Item 0', '100', '125', '225'], "open value was readded");
  });
});


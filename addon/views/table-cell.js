import Ember from 'ember';
import StyleBindingsMixin from '../mixins/style-bindings-mixin';

var TableCell;

TableCell = Ember.View.extend(StyleBindingsMixin, {

  /*
   * ---------------------------------------------------------------------------
   * API - Inputs
   * ---------------------------------------------------------------------------
   */

  /*
  TODO: Doc
  templateName:       'table-cell'
  classNames:         ['ember-table-cell']
  classNameBindings:  'column.textAlign'
  styleBindings:      'width'
   */

  /*
   * ---------------------------------------------------------------------------
   * Internal properties
   * ---------------------------------------------------------------------------
   */
  init: function() {
    this._super();
    this.contentPathDidChange();
    return this.contentDidChange();
  },
  row: Ember.computed.alias('parentView.row'),
  column: Ember.computed.alias('content'),
  width: Ember.computed.alias('column.columnWidth'),
  contentDidChange: function() {
    return this.notifyPropertyChange('cellContent');
  },
  contentPathWillChange: (function() {
    var contentPath;
    contentPath = this.get('column.contentPath');
    if (contentPath) {
      return this.removeObserver("row." + contentPath, this, this.contentDidChange);
    }
  }).observesBefore('column.contentPath'),
  contentPathDidChange: (function() {
    var contentPath;
    contentPath = this.get('column.contentPath');
    if (contentPath) {
      return this.addObserver("row." + contentPath, this, this.contentDidChange);
    }
  }).observesBefore('column.contentPath'),
  cellContent: Ember.computed(function(key, value) {
    var column, row;
    row = this.get('row');
    column = this.get('column');
    if (!(row && column)) {
      return;
    }
    if (arguments.length === 1) {
      value = column.getCellContent(row);
    } else {
      column.setCellContent(row, value);
    }
    return value;
  }).property('row.isLoaded', 'column')
});

export default TableCell;
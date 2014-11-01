import Ember from 'ember';
import StyleBindingsMixin from '../mixins/style-bindings-mixin';

/* global jQuery, $ */

var HeaderCell;

HeaderCell = Ember.View.extend(StyleBindingsMixin, {

  /*
   * ---------------------------------------------------------------------------
   * API - Inputs
   * ---------------------------------------------------------------------------
   */

  /*
  TODO: Doc
  templateName:       'header-cell'
  classNames:         ['ember-table-cell', 'ember-table-header-cell']
  classNameBindings:  ['column.isSortable:sortable', 'column.textAlign']
  styleBindings:      ['width', 'height']
   */

  /*
   * ---------------------------------------------------------------------------
   * Internal properties
   * ---------------------------------------------------------------------------
   */
  column: Ember.computed.alias('content'),
  width: Ember.computed.alias('column.columnWidth'),
  height: Ember.computed(function() {
    return this.get('controller._headerHeight');
  }).property('controller._headerHeight'),

  /* jQuery UI resizable option */
  resizableOption: Ember.computed(function() {
    return {
      handles: 'e',
      minHeight: 40,
      minWidth: this.get('column.minWidth') || 100,
      maxWidth: this.get('column.maxWidth') || 500,
      grid: this.get('column.snapGrid'),
      resize: jQuery.proxy(this.onColumnResize, this),
      stop: jQuery.proxy(this.onColumnResize, this)
    };
  }),
  didInsertElement: function() {
    this.elementSizeDidChange();
    if (this.get('column.isResizable')) {
      this.$().resizable(this.get('resizableOption'));
      this._resizableWidget = this.$().resizable('widget');
    }
  },

  /* `event` here is a jQuery event */
  onColumnResize: function(event, ui) {
    this.elementSizeDidChange();

    /*
    Special case for force-filled columns: if this is the last column you
    resize (or the only column), then it will be reset to before the resize
    to preserve the table's force-fill property.
     */
    if (this.get('controller.forceFillColumns') && this.get('controller.columns').filterProperty('canAutoResize').length > 1) {
      this.set('column.canAutoResize', false);
    }
    return this.get("column").resize(ui.size.width);
  },
  elementSizeDidChange: function() {
    var maxHeight;
    maxHeight = 0;

    /* TODO(Louis): This seems bad... */
    $('.ember-table-header-block .ember-table-content').each(function() {
      var thisHeight;
      thisHeight = $(this).outerHeight();
      if (thisHeight > maxHeight) {
        return maxHeight = thisHeight;
      }
    });
    this.set('controller._contentHeaderHeight', maxHeight);
  }
});

export default HeaderCell;
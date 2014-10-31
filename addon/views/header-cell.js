import Ember from 'ember';
import StyleBindingsMixin from 'ember-cli-ember-table/mixins/style-bindings-mixin';

export default Ember.View.extend(StyleBindingsMixin, {
  column: Ember.computed.alias('content'),
  width: Ember.computed.alias('column.columnWidth'),
  height: Ember.computed('controller._headerHeight', function() {
    return this.get('controller._headerHeight');
  }),
  resizableOption: Ember.computed(function() {
    // jQuery UI resizable option
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
      return;
    }
  },
  onColumnResize: function (event, ui) {
    // `event` here is a jQuery event
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

    // TODO(Louis): This seems bad...
    var thisHeight;
    thisHeight = $(this).outerHeight();
    if (thisHeight > maxHeight) {
      maxHeight = thisHeight;
    }
    this.set('controller._contentHeaderHeight', maxHeight);
  }
});
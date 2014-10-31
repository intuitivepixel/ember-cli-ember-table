import Ember from 'ember';
import StyleBindingsMixin from '../mixins/style-bindings-mixin';

/*
We hacked this. There is an inconsistency at the level in which we are
handling scroll event...
 */
var HeaderRow;

HeaderRow = Ember.View.extend(StyleBindingsMixin, {
  templateName: 'header-row',
  classNames: ['ember-table-table-row', 'ember-table-header-row'],
  styleBindings: ['width'],
  columns: Ember.computed.alias('content'),
  width: Ember.computed.alias('controller._rowWidth'),
  scrollLeft: Ember.computed.alias('controller._tableScrollLeft'),

  /* Options for jQuery UI sortable */
  sortableOption: Ember.computed(function() {
    return {
      axis: 'x',
      containment: 'parent',
      cursor: 'move',
      helper: 'clone',
      items: ".ember-table-header-cell.sortable",
      opacity: 0.9,
      placeholder: 'ui-state-highlight',
      scroll: true,
      tolerance: 'intersect',
      update: jQuery.proxy(this.onColumnSortDone, this),
      stop: jQuery.proxy(this.onColumnSortStop, this),
      sort: jQuery.proxy(this.onColumnSortChange, this)
    };
  }),
  onScrollLeftDidChange: Ember.observer(function() {
    return this.$().scrollLeft(this.get('scrollLeft'));
  }, 'scrollLeft'),
  didInsertElement: function() {
    this._super();
    if (this.get('controller.enableColumnReorder')) {
      return this.$('> div').sortable(this.get('sortableOption'));
    }
  },
  onScroll: function(event) {
    this.set('scrollLeft', event.target.scrollLeft);
    return event.preventDefault();
  },
  onColumnSortStop: function(event, ui) {
    return this.set('controller._isShowingSortableIndicator', false);
  },
  onColumnSortChange: function(event, ui) {
    var left;
    left = this.$('.ui-state-highlight').offset().left - this.$().closest('.ember-table-tables-container').offset().left;
    this.set('controller._isShowingSortableIndicator', true);
    return this.set('controller._sortableIndicatorLeft', left);
  },
  onColumnSortDone: function(event, ui) {
    var column, newIndex, view;
    newIndex = ui.item.index();
    view = Ember.View.views[ui.item.attr('id')];
    column = view.get('column');
    this.get('controller').onColumnSort(column, newIndex);
    return this.set('controller._isShowingSortableIndicator', false);
  }
});

export default HeaderRow;
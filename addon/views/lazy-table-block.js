import Ember from 'ember';
import LazyContainerView from '../views/lazy-container';

var LazyTableBlock;

LazyTableBlock = LazyContainerView.extend({
  classNames: ['ember-table-table-block'],
  styleBindings: ['width'],
  itemViewClass: Ember.computed.alias('controller.tableRowViewClass'),
  rowHeight: Ember.computed.alias('controller.rowHeight'),
  columns: null,
  content: null,
  scrollLeft: null,
  scrollTop: null,
  onScrollLeftDidChange: Ember.observer(function() {
    return this.$().scrollLeft(this.get('scrollLeft'));
  }, 'scrollLeft')
});

export default LazyTableBlock;
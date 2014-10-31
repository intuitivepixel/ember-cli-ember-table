import Ember from 'ember';
import LazyContainerView from 'ember-cli-ember-table/view/lazy-container';

export default LazyContainerView.extend({
  classNames: ['ember-table-table-block'],
  styleBindings: ['width'],
  itemViewClass: Ember.computed.alias('controller.tableRowViewClass'),
  rowHeight: Ember.computed.alias('controller.rowHeight'),
  columns: null,
  content: null,
  scrollLeft: null,
  scrollTop: null,
  onScrollLeftDidChange: Ember.observer('scrollLeft', function() {
    return this.$().scrollLeft(this.get('scrollLeft'));
  })
});
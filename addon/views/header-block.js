import Ember from 'ember';
import TableBlock from '../views/table-block';

export default TableBlock.extend({
  classNames: ['ember-table-header-block'],
  itemViewClass: 'header-row',
  // TODO(taras): this should probably be computed.oneWay
  content: Ember.computed(function() {
    return [this.get('columns')];
  }).property('columns')
});

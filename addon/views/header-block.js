import Ember from 'ember';
import TableBlock from 'ember-cli-ember-table/views/table-block';

export default TableBlock.extend({
  classNames: ['ember-table-header-block'],
  itemViewClass: 'header-row',
  content: Ember.computed('columns', function() {
    return [this.get('columns')];
  })
});
import Ember from 'ember';
import TableBlock from '../views/table-block';

var HeaderBlock;

HeaderBlock = TableBlock.extend({
  classNames: ['ember-table-header-block'],
  itemViewClass: 'header-row',
  content: Ember.computed(function() {
    return [this.get('columns')];
  }).property('columns')
});

export default HeaderBlock;
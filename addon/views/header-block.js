import Ember from 'ember';
import TableBlock from '../views/table-block';

const {computed} = Ember;

export default TableBlock.extend({
  classNames: ['ember-table-header-block'],
  itemViewClass: 'header-row',
  // TODO(taras): this should probably be computed.oneWay
  content: computed('columns', function() {
    return [this.get('columns')];
  })
});

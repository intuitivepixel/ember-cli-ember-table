import Ember from 'ember';
import Column from 'ember-cli-ember-table/column-definition';

export default Ember.Controller.extend({
  columnsData: [
    {
      headerCellName: 'Item Name',
      contentPath: 'name'
    },
    {
      headerCellName: 'Open',
      contentPath: 'open'
    },
    {
      headerCellName: 'Close',
      contentPath: 'close'
    },
    {
      headerCellName: 'Total',
      contentPath: 'total'
    }
  ],
  columns: Ember.computed.map('columnsData', (column)=>Column.create(column)),
  proxiedColumns: Ember.computed.map('columns', function(column){
    return Ember.ObjectProxy.create({
      isVisible: true,
      content: column
    });
  }),
  proxiedVisibleColumns: Ember.computed.filterBy('proxiedColumns', 'isVisible', true),
  visibleColumns: Ember.computed('proxiedVisibleColumns.@each', function(){
    return this.get('proxiedVisibleColumns').map((proxy)=>{
      return proxy.content;
    });
  }),
  actions: {
    toggleColumn(column) {
      Ember.set(column, 'isVisible', !Ember.get(column, 'isVisible'));
    }
  }
});

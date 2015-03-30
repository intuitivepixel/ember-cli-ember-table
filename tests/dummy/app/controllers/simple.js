import Ember from 'ember';
import Column from 'ember-cli-drg-ember-table/column-definition';

export default Ember.Controller.extend({
  columns: Ember.computed(function(){
    return [
      Column.create({
        headerCellName: 'Open',
        contentPath: 'open'
      }),
      Column.create({
        headerCellName: 'Close',
        contentPath: 'close'
      }),
      Column.create({
        headerCellName: 'Total',
        contentPath: 'total'
      })
    ];
  })
});

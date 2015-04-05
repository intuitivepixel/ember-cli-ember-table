import Ember from 'ember';
import Column from 'ember-cli-ember-table/column-definition';

var get = Ember.get;

export default Ember.ArrayController.extend({
  queryParams: [{
    "sort-by": 'sortProperties',
    asc: 'sortAscending'
  }],

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
  }),

  sortProperties: ['open'],
  sortAscending: true,

  actions: {
    sortByColumn: function(column) {
      var contentPath = get(column, 'contentPath');
      if (contentPath === this.get('sortProperties.firstObject')) {
        this.toggleProperty('sortAscending');
      } else {
        this.set('sortProperties', [contentPath]);
        this.set('sortAscending', true);
      }
    }

  }
});

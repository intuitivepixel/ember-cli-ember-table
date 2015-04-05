import Ember from 'ember';
import Column from 'ember-cli-ember-table/column-definition';

var get = Ember.get;

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
  }),

  sortContentPath: 'open',
  isDescending: false,
  sortOrder: Ember.computed('sortContentPath', 'isDescending', function(){
    var sortContentPath = this.get('sortContentPath');
    var isDescending = this.get('isDescending');
    if (isDescending) {
      sortContentPath = `${sortContentPath}:desc`;
    }
    return [sortContentPath];
  }),
  sorted: Ember.computed.sort('model', 'sortOrder'),

  actions: {
    sortByColumn: function(column) {
      var contentPath = get(column, 'contentPath');
      if (this.get('sortContentPath') === contentPath) {
        this.toggleProperty('isDescending');
        return;
      }
      this.set('sortContentPath', contentPath);
      this.set('isDescending', false);
    }

  }
});

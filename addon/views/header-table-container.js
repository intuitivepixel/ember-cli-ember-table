import Ember from 'ember';
import ShowHorizontalScrollMixin from '../mixins/show-horizontal-scroll-mixin';
import TableContainer from '../views/table-container';

export default TableContainer.extend(ShowHorizontalScrollMixin, {
  templateName: 'header-table-container',
  classNames: ['ember-table-table-container', 'ember-table-fixed-table-container', 'ember-table-header-container'],
  height: Ember.computed.alias('controller._headerHeight'),
  width: Ember.computed.alias('controller._tableContainerWidth')
});

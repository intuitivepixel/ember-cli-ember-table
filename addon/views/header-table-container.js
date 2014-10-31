import Ember from 'ember';
import ShowHorizontalScrollMixin from '../mixins/show-horizontal-scroll-mixin';
import TableContainer from '../views/table-container';

var HeaderTableContainer;

HeaderTableContainer = TableContainer.extend(ShowHorizontalScrollMixin, {
  templateName: 'header-container',
  classNames: ['ember-table-table-container', 'ember-table-fixed-table-container', 'ember-table-header-container'],
  height: Ember.computed.alias('controller._headerHeight'),
  width: Ember.computed.alias('controller._tableContainerWidth')
});

export default HeaderTableContainer;
`import Ember from 'ember';`
`import ShowHorizontalScrollMixin from 'ember-cli-ember-table/mixins/show-horizontal-scroll-mixin';`
`import TableContainer from 'ember-cli-ember-table/views/table-container';`

HeaderTableContainer = TableContainer.extend ShowHorizontalScrollMixin,
  templateName: 'header-container'
  classNames:   ['ember-table-table-container',
                 'ember-table-fixed-table-container',
                 'ember-table-header-container']
  height:       Ember.computed.alias 'controller._headerHeight'
  width:        Ember.computed.alias 'controller._tableContainerWidth'

`export default HeaderTableContainer`
`import Ember from 'ember';`
`import StyleBindingsMixin from 'ember-cli-ember-table/mixins/style-bindings-mixin';`

### TODO: This should be a mixin ###
TableBlock = Ember.CollectionView.extend StyleBindingsMixin,
  classNames:     ['ember-table-table-block']
  styleBindings:  ['width', 'height']
  itemViewClass:  Ember.computed.alias 'controller.tableRowViewClass'
  columns: null
  content: null
  scrollLeft: null

  onScrollLeftDidChange: Ember.observer ->
    @$().scrollLeft @get('scrollLeft')
  , 'scrollLeft'

  height: Ember.computed ->
    @get('controller._headerHeight')
  .property('controller._headerHeight')

`export default TableBlock`

`import Ember from 'ember';`
`import StyleBindingsMixin from '../mixins/style-bindings-mixin';`

###*
 * Lazy Item View
 * @class
 * @alias Ember.LazyItemView
 ###
LazyItemView = Ember.View.extend StyleBindingsMixin,
  itemIndex: null
  prepareContent: Ember.K
  teardownContent: Ember.K
  rowHeightBinding: 'parentView.rowHeight'
  styleBindings: ['width', 'top', 'display']

  top: Ember.computed ->
    @get('itemIndex') * @get('rowHeight')
  .property 'itemIndex', 'rowHeight'

  display: Ember.computed ->
    'none' if not @get('content')
  .property 'content'

`export default LazyItemView;`
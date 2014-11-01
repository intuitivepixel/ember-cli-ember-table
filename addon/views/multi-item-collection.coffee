`import Ember from 'ember';`
`import StyleBindingsMixin from '../mixins/style-bindings-mixin';`

 ###*
 * Multi Item View Collection View
 * @class
 * @alias Ember.Table.MultiItemViewCollectionView
 ###
MultiItemViewCollectionView = Ember.CollectionView.extend StyleBindingsMixin,
  styleBindings:  'width'
  itemViewClassField: null
  createChildView: (view, attrs) ->
    itemViewClassField = @get 'itemViewClassField'
    itemViewClass = attrs.content.get(itemViewClassField)
    if typeof itemViewClass is 'string'
      if /[A-Z]+/.exec itemViewClass
        # Global var lookup - 'App.MessagePreviewView'
        itemViewClass = Ember.get Ember.lookup, itemViewClass
      else
        # Ember CLI Style lookup - 'message/preview'
        itemViewClass = @container.lookupFactory "view:#{itemViewClass}"

    @_super(itemViewClass, attrs)

`export default MultiItemViewCollectionView;`
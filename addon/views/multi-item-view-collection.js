import Ember from 'ember';

export default Ember.CollectionView.extend({
  itemViewClassField: null,
  createChildView: function(view, attrs) {
    var itemViewClass, itemViewClassField;
    itemViewClassField = this.get('itemViewClassField');
    itemViewClass = attrs.content.get(itemViewClassField);
    if (typeof itemViewClass === 'string') {
      if (/[A-Z]+/.exec(itemViewClass)) {

        /* Global var lookup - 'App.MessagePreviewView' */
        itemViewClass = Ember.get(Ember.lookup, itemViewClass);
      } else {

        /* Ember CLI Style lookup - 'message/preview' */
        itemViewClass = this.container.lookupFactory("view:" + itemViewClass);
      }
    }
    return this._super(itemViewClass, attrs);
  }
});

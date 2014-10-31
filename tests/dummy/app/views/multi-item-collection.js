import Ember from 'ember';
import StyleBindingsMixin from 'ember-cli-ember-table/mixins/style-bindings-mixin';

export default Ember.CollectionView.extend(StyleBindingsMixin, {
    styleBindings: 'width',
    itemViewClassField: null,
    createChildView: function(view, attrs) {
      var itemViewClass, itemViewClassField;
      itemViewClassField = this.get('itemViewClassField');
      itemViewClass = attrs.content.get(itemViewClassField);
      if (typeof itemViewClass === 'string') {
        if (/[A-Z]+/.exec(itemViewClass)) {

          // Global var lookup - 'App.MessagePreviewView'
        } else {

          // Ember CLI Style lookup - 'message/preview'
        }
      }
      return this._super(itemViewClass, attrs);
    }
  });
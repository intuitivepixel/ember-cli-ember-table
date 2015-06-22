import Ember from 'ember';
import StyleBindingsMixin from '../mixins/style-bindings-mixin';

export default Ember.View.extend(StyleBindingsMixin, {
  itemIndex: null,
  prepareContent: Ember.K,
  teardownContent: Ember.K,
  rowHeightBinding: 'parentView.rowHeight',
  styleBindings: ['width', 'top', 'display'],
  top: Ember.computed('itemIndex', 'rowHeight', function() {
    return this.get('itemIndex') * this.get('rowHeight');
  }),
  display: Ember.computed('content', function() {
    if (!this.get('content')) {
      return 'none';
    }
  })
});

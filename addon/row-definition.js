import Ember from 'ember';

var RowDefinition = Ember.ObjectProxy.extend({
  content: null,
  isShowing: true,
  isHovered: false,
  isSelected: Ember.computed('parentController._selection.[]', function(key, val) {
    if (arguments.length > 1) {
      this.get('parentController').setSelected(this, val);
    }
    return this.get('parentController').isSelected(this);
  })
});

export default RowDefinition;

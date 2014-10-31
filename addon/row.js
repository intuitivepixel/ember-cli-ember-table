import Ember from 'ember';

export default Ember.ObjectProxy.extend({
  content: null,
  isSelected: Ember.computed('parentController._selection.[]', function(key, val) {
    if (arguments.length > 1) {
      this.get('parentController').setSelected(this, val);
    }
    return this.get('parentController').isSelected(this);
  }),
  isShowing: true,
  isHovered: false
});
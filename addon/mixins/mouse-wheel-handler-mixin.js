import Ember from 'ember';

var MouseWheelHandlerMixin;

MouseWheelHandlerMixin = Ember.Mixin.create({
  onMouseWheel: Ember.K,
  didInsertElement: function() {
    this._super();
    return this.$().bind('mousewheel', (function(_this) {
      return function(event, delta, deltaX, deltaY) {
        return Ember.run(_this, _this.onMouseWheel, event, delta, deltaX, deltaY);
      };
    })(this));
  },
  willDestroyElement: function() {
    var _ref;
    if ((_ref = this.$()) != null) {
      _ref.unbind('mousewheel');
    }
    return this._super();
  }
});

export default MouseWheelHandlerMixin;
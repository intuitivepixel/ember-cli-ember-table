import Ember from 'ember';

export default Ember.Mixin.create({
  onTouchMove: Ember.K,
  didInsertElement: function() {
    var startX, startY;
    this._super();
    startX = startY = 0;
    this.$().bind('touchstart', function(event) {
      startX = event.originalEvent.targetTouches[0].pageX;
      startY = event.originalEvent.targetTouches[0].pageY;
    });
    return this.$().bind('touchmove', (function(_this) {
      return function(event) {
        var deltaX, deltaY, newX, newY;
        newX = event.originalEvent.targetTouches[0].pageX;
        newY = event.originalEvent.targetTouches[0].pageY;
        deltaX = -(newX - startX);
        deltaY = -(newY - startY);
        Ember.run(_this, _this.onTouchMove, event, deltaX, deltaY);
        startX = newX;
        startY = newY;
      };
    })(this));
  },
  willDestroy: function() {
    var _ref;
    if ((_ref = this.$()) != null) {
      _ref.unbind('touchmove');
    }
    return this._super();
  }
});
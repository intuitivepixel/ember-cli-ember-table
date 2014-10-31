import Ember from 'ember';

export default Ember.Mixin.create({
  onScroll: Ember.K,
  scrollElementSelector: '',
  didInsertElement: function() {
    this._super();
    return this.$(this.get('scrollElementSelector')).bind('scroll', (function(_this) {
      return function(event) {
        return Ember.run(_this, _this.onScroll, event);
      };
    })(this));
  },
  willDestroyElement: function() {
    var _ref;
    if ((_ref = this.$(this.get('scrollElementSelector'))) != null) {
      _ref.unbind('scroll');
    }
    return this._super();
  }
});
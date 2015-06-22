import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var model = [];
    var open = 100;
    for (var i = 0; i < 1000; i++) {
      var close = open + 25;
      model.push({
        name: `Item ${i}`,
        open: open,
        close: close,
        total: open + close
      });
      open = close;
    }
    return model;
  }
});

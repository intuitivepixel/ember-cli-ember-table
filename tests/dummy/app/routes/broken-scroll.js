import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var model = [];
    var open = 100;
    for (var i = 0; i < 8; i++){
      var close = open + 25;
      model.pushObject({
        open: open,
        close: close,
        total: open + close
      });
      open = close;
    }
    return model;
  }
});

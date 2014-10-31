import Ember from 'ember';

export default Ember.ArrayController.extend({
  itemController: null,
  content: null,
  rowContent: Ember.computed(function() {
    return [];
  }).property(),
  controllerAt: function(idx, object, controllerClass) {
    var container, subController, subControllers;
    container = this.get('container');
    subControllers = this.get('_subControllers');
    subController = subControllers[idx];
    if (subController) {
      return subController;
    }
    subController = this.get('itemController').reopen({
      target: this,
      parentController: this.get('parentController') || this,
      content: object
    });
    subControllers[idx] = subController;
    return subController;
  }
});
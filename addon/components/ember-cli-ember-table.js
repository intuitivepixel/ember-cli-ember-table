import Ember from 'ember';

export default Ember.Component.extend({
  hello: function() {
    Ember.Logger.debug('hello from ember-cli-ember-table');
  }.on('init')
});
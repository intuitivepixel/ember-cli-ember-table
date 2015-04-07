import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('brokenscroll');
  this.route('simple');
  this.route('fixed');
  this.route('removable-columns');
  this.route('sort-array-controller');
  this.route('sort-computed');
});

export default Router;

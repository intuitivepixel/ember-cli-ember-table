import Ember from 'ember';

Ember.Test.registerHelper('text', function(app, selector, context){
  return Ember.$(selector).map(function(){
    return Ember.$(this).text().trim();
  }).toArray();
});

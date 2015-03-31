import Ember from 'ember';
import StyleBindingsMixin from '../mixins/style-bindings-mixin';

export default Ember.View.extend(StyleBindingsMixin, {
  classNames: ['ember-table-table-container'],
  styleBindings: ['height', 'width']
});

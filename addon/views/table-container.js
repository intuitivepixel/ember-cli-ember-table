import Ember from 'ember';
import StyleBindingsMixin from '../mixins/style-bindings-mixin';

var TableContainer;

TableContainer = Ember.View.extend(StyleBindingsMixin, {
  classNames: ['ember-table-table-container'],
  styleBindings: ['height', 'width']
});

export default TableContainer;
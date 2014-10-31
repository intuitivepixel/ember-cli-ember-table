`import Ember from 'ember';`
`import StyleBindingsMixin from 'ember-cli-ember-table/mixins/style-bindings-mixin';`

TableContainer = Ember.View.extend StyleBindingsMixin,
  classNames:     ['ember-table-table-container']
  styleBindings:  ['height', 'width']

`export default TableContainer`
`import Ember from 'ember';`
`import StyleBindingsMixin from 'ember-cli-ember-table/mixins/style-bindings-mixin';`

ScrollPanel = Ember.View.extend StyleBindingsMixin,
  classNames:     ['ember-table-scroll-panel']
  styleBindings:  ['width', 'height']
  width:   Ember.computed.alias 'controller._tableColumnsWidth'
  height:  Ember.computed.alias 'controller._tableContentHeight'

`export default ScrollPanel`
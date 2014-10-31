`import Ember from 'ember';`
`import StyleBindingsMixin from 'ember-cli-ember-table/mixins/style-bindings-mixin';`

ColumnSortableIndicator = Ember.View.extend StyleBindingsMixin,
  classNames: 'ember-table-column-sortable-indicator'
  classNameBindings: 'controller._isShowingSortableIndicator:active'
  styleBindings: ['left', 'height']
  left:   Ember.computed.alias 'controller._sortableIndicatorLeft'
  height: Ember.computed.alias 'controller._height'

`export default ColumnSortableIndicator`
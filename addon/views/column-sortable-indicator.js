import Ember from 'ember';
import StyleBindingsMixin from '../mixins/style-bindings-mixin';

var ColumnSortableIndicator;

ColumnSortableIndicator = Ember.View.extend(StyleBindingsMixin, {
  classNames: 'ember-table-column-sortable-indicator',
  classNameBindings: 'controller._isShowingSortableIndicator:active',
  styleBindings: ['left', 'height'],
  left: Ember.computed.alias('controller._sortableIndicatorLeft'),
  height: Ember.computed.alias('controller._height')
});

export default ColumnSortableIndicator;
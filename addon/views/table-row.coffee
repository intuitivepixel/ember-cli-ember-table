`import Ember from 'ember';`
`import LazyItemView from 'ember-cli-ember-table/views/lazy-item';`

TableRow = LazyItemView.extend
  templateName:   'table-row'
  classNames:     'ember-table-table-row'
  classNameBindings: ['row.isHovered:ember-table-hover', 'row.isSelected:ember-table-selected',
                      'row.rowStyle', 'isLastRow:ember-table-last-row']
  styleBindings:  ['width', 'height']
  row:      Ember.computed.alias 'content'
  columns:  Ember.computed.alias 'parentView.columns'
  width:    Ember.computed.alias 'controller._rowWidth'
  height:   Ember.computed.alias 'controller.rowHeight'

  isLastRow: Ember.computed ->
    @get('row') is @get('controller.bodyContent.lastObject')
  .property 'controller.bodyContent.lastObject', 'row'

  mouseEnter: (event) ->
    row = @get 'row'
    row.set 'isHovered', yes if row

  mouseLeave: (event) ->
    row = @get 'row'
    row.set 'isHovered', no if row

  teardownContent: ->
    row = @get 'row'
    row.set 'isHovered', no if row

`export default TableRow`
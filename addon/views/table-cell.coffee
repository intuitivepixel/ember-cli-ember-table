`import Ember from 'ember';`
`import StyleBindingsMixin from 'ember-cli-ember-table/mixins/style-bindings-mixin';`

TableCell = Ember.View.extend StyleBindingsMixin,

  ###
  # ---------------------------------------------------------------------------
  # API - Inputs
  # ---------------------------------------------------------------------------
  ###

  ###
  TODO: Doc
  templateName:       'table-cell'
  classNames:         ['ember-table-cell']
  classNameBindings:  'column.textAlign'
  styleBindings:      'width'
  ###

  ###
  # ---------------------------------------------------------------------------
  # Internal properties
  # ---------------------------------------------------------------------------
  ###

  init: ->
    @_super()
    @contentPathDidChange()
    @contentDidChange()

  row:        Ember.computed.alias 'parentView.row'
  column:     Ember.computed.alias 'content'
  width:      Ember.computed.alias 'column.columnWidth'

  contentDidChange: ->
    @notifyPropertyChange 'cellContent'

  contentPathWillChange: (->
    contentPath = @get 'column.contentPath'
    if contentPath
      @removeObserver("row.#{contentPath}", this, this.contentDidChange)
  ).observesBefore 'column.contentPath'

  contentPathDidChange: (->
    contentPath = this.get 'column.contentPath'
    if contentPath
      @addObserver("row.#{contentPath}", this, this.contentDidChange)
  ).observesBefore 'column.contentPath'

  cellContent: Ember.computed (key, value) ->
    row     = @get 'row'
    column  = @get 'column'
    return unless row and column
    if arguments.length is 1
      value = column.getCellContent row
    else
      column.setCellContent row, value
    value
  .property 'row.isLoaded', 'column'

`export default TableCell`
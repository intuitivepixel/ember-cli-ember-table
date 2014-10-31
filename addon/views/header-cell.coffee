`import Ember from 'ember';`
`import StyleBindingsMixin from 'ember-cli-ember-table/mixins/style-bindings-mixin';`

HeaderCell = Ember.View.extend StyleBindingsMixin,

  ###
  # ---------------------------------------------------------------------------
  # API - Inputs
  # ---------------------------------------------------------------------------
  ###

  ###
  TODO: Doc
  templateName:       'header-cell'
  classNames:         ['ember-table-cell', 'ember-table-header-cell']
  classNameBindings:  ['column.isSortable:sortable', 'column.textAlign']
  styleBindings:      ['width', 'height']
  ###

  ###
  # ---------------------------------------------------------------------------
  # Internal properties
  # ---------------------------------------------------------------------------
  ###

  column:         Ember.computed.alias 'content'
  width:          Ember.computed.alias 'column.columnWidth'
  height: Ember.computed ->
    @get('controller._headerHeight')
  .property('controller._headerHeight')

  ### jQuery UI resizable option ###
  resizableOption: Ember.computed ->
    handles: 'e'
    minHeight: 40
    minWidth: @get('column.minWidth') || 100
    maxWidth: @get('column.maxWidth') || 500
    grid:     @get('column.snapGrid')
    resize: jQuery.proxy(@onColumnResize, this)
    stop: jQuery.proxy(@onColumnResize, this)

  didInsertElement: ->
    @elementSizeDidChange()
    if @get('column.isResizable')
      @$().resizable(@get('resizableOption'))
      @_resizableWidget = @$().resizable('widget')
      return

  ### `event` here is a jQuery event ###
  onColumnResize: (event, ui) ->
    @elementSizeDidChange()
    ###
    Special case for force-filled columns: if this is the last column you
    resize (or the only column), then it will be reset to before the resize
    to preserve the table's force-fill property.
    ###
    if @get('controller.forceFillColumns') and
        @get('controller.columns').filterProperty('canAutoResize').length > 1
      @set('column.canAutoResize', false)
    @get("column").resize(ui.size.width)

  elementSizeDidChange: ->
    maxHeight = 0
    ### TODO(Louis): This seems bad... ###
    $('.ember-table-header-block .ember-table-content').each ->
      thisHeight = $(this).outerHeight()
      if thisHeight > maxHeight then maxHeight = thisHeight
    @set 'controller._contentHeaderHeight', maxHeight
    return

`export default HeaderCell`
`import Ember from 'ember';`
`import StyleBindingsMixin from 'ember-cli-ember-table/mixins/style-bindings-mixin';`

###
We hacked this. There is an inconsistency at the level in which we are
handling scroll event...
###
HeaderRow = Ember.View.extend StyleBindingsMixin,
  templateName:   'header-row'
  classNames:     ['ember-table-table-row', 'ember-table-header-row']
  styleBindings: ['width']
  columns:        Ember.computed.alias 'content'
  width:          Ember.computed.alias 'controller._rowWidth'
  scrollLeft:     Ember.computed.alias 'controller._tableScrollLeft'

  ### Options for jQuery UI sortable ###
  sortableOption: Ember.computed ->
    axis: 'x'
    containment: 'parent'
    cursor: 'move'
    helper: 'clone'
    items: ".ember-table-header-cell.sortable"
    opacity: 0.9
    placeholder: 'ui-state-highlight'
    scroll: true
    tolerance: 'intersect'
    update: jQuery.proxy(@onColumnSortDone,   this)
    stop:   jQuery.proxy(@onColumnSortStop,   this)
    sort:   jQuery.proxy(@onColumnSortChange, this)

  onScrollLeftDidChange: Ember.observer ->
    @$().scrollLeft @get('scrollLeft')
  , 'scrollLeft'

  didInsertElement: ->
    @_super()
    if @get('controller.enableColumnReorder')
      @$('> div').sortable(@get('sortableOption'))

  onScroll: (event) ->
    @set 'scrollLeft', event.target.scrollLeft
    event.preventDefault()

  onColumnSortStop: (event, ui) ->
    @set 'controller._isShowingSortableIndicator', no

  onColumnSortChange: (event, ui) ->
    left = @$('.ui-state-highlight').offset().left -
           @$().closest('.ember-table-tables-container').offset().left
    @set 'controller._isShowingSortableIndicator', yes
    @set 'controller._sortableIndicatorLeft', left

  onColumnSortDone: (event, ui) ->
    newIndex = ui.item.index()
    view     = Ember.View.views[ui.item.attr('id')]
    column   = view.get 'column'
    @get('controller').onColumnSort column, newIndex
    @set 'controller._isShowingSortableIndicator', no

`export default HeaderRow`
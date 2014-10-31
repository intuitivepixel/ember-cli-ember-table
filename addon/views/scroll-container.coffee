`import Ember from 'ember';`
`import ScrollHandlerMixin from 'ember-cli-ember-table/mixins/scroll-handler-mixin';`
`import StyleBindingsMixin from 'ember-cli-ember-table/mixins/style-bindings-mixin';`

ScrollContainer = Ember.View.extend StyleBindingsMixin, ScrollHandlerMixin,
  templateName: 'scroll-container'
  classNames:     ['ember-table-scroll-container']
  styleBindings:  ['left', 'width', 'height']
  scrollElementSelector: '.antiscroll-inner'
  width:          Ember.computed.alias 'controller._scrollContainerWidth'
  ### 10 is the height of the horizontal scrollbar ###
  height:         10
  left:           Ember.computed.alias 'controller._fixedColumnsWidth'
  scrollTop:      Ember.computed.alias 'controller._tableScrollTop'
  scrollLeft:     Ember.computed.alias 'controller._tableScrollLeft'

  ###
  HACK: onScrollLeftDidChange will not fire unless scrollLeft has been get
  at least once. Therefore, we want to call onScrollLeftDidChange in
  didInsertElement
  ###
  didInsertElement: ->
    @_super()
    @onScrollLeftDidChange()

  ### `event` here is a jQuery event ###
  onScroll: (event) ->
    @set 'scrollLeft', event.target.scrollLeft
    event.preventDefault()

  onScrollLeftDidChange: Ember.observer ->
    selector = @get('scrollElementSelector')
    @$(selector).scrollLeft @get('scrollLeft')
  , 'scrollLeft', 'scrollElementSelector'

`export default ScrollContainer`
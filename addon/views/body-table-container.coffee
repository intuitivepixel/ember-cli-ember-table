`import Ember from 'ember';`
`import MouseWheelHandlerMixin from '../mixins/mouse-wheel-handler-mixin';`
`import TouchMoveHandlerMixin from '../mixins/touch-move-handler-mixin';`
`import ScrollHandlerMixin from '../mixins/scroll-handler-mixin';`
`import ShowHorizontalScrollMixin from '../mixins/show-horizontal-scroll-mixin';`
`import TableContainer from '../views/table-container';`

BodyTableContainer = TableContainer.extend MouseWheelHandlerMixin,
TouchMoveHandlerMixin, ScrollHandlerMixin, ShowHorizontalScrollMixin,
  templateName:   'body-container'
  classNames:     ['ember-table-table-container', 'ember-table-body-container',
                   'antiscroll-wrap']
  height:         Ember.computed.alias 'controller._bodyHeight'
  width:          Ember.computed.alias 'controller._width'
  scrollTop:      Ember.computed.alias 'controller._tableScrollTop'
  scrollLeft:     Ember.computed.alias 'controller._tableScrollLeft'
  scrollElementSelector: '.antiscroll-inner'

  ### `event` here is a jQuery event ###
  onScroll: (event) ->
    @set 'scrollTop', event.target.scrollTop
    event.preventDefault()

  ### `event` here is a jQuery event ###
  onMouseWheel: (event, delta, deltaX, deltaY) ->
    return unless Math.abs(deltaX) > Math.abs(deltaY)
    scrollLeft = @$('.ember-table-right-table-block').scrollLeft() + deltaX
    @set 'scrollLeft', scrollLeft
    event.preventDefault()

  onTouchMove: (event, deltaX, deltaY) ->
    return unless (Math.abs(deltaX) > Math.abs(deltaY))
    scrollLeft = @$('.ember-table-right-table-block').scrollLeft() + deltaX
    @set 'scrollLeft', scrollLeft
    event.preventDefault()

`export default BodyTableContainer`
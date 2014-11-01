`import Ember from 'ember';`
`import MouseWheelHandlerMixin from '../mixins/mouse-wheel-handler-mixin';`
`import TouchMoveHandlerMixin from '../mixins/touch-move-handler-mixin';`
`import ShowHorizontalScrollMixin from '../mixins/show-horizontal-scroll-mixin';`
`import TableContainer from '../views/table-container';`

FooterTableContainer = TableContainer.extend MouseWheelHandlerMixin,
TouchMoveHandlerMixin, ShowHorizontalScrollMixin,
  templateName:   'footer-container'
  classNames:     ['ember-table-table-container',
                   'ember-table-fixed-table-container',
                   'ember-table-footer-container']
  styleBindings:  'top'
  height:         Ember.computed.alias 'controller.footerHeight'
  width:          Ember.computed.alias 'controller._tableContainerWidth'
  scrollLeft:     Ember.computed.alias 'controller._tableScrollLeft'
  top: Ember.computed ->
    headerHeight  = @get 'controller._headerHeight'
    contentHeight = @get('controller._tableContentHeight') + headerHeight
    bodyHeight    = @get('controller._bodyHeight') + headerHeight
    if contentHeight < bodyHeight then contentHeight else bodyHeight
  .property('controller._bodyHeight', 'controller._headerHeight'
            'controller._tableContentHeight')

  onMouseWheel: (event, delta, deltaX, deltaY) ->
    scrollLeft = @$('.ember-table-right-table-block').scrollLeft() + deltaX
    @set 'scrollLeft', scrollLeft
    event.preventDefault()

  onTouchMove: (event, deltaX, deltaY) ->
    scrollLeft = @$('.ember-table-right-table-block').scrollLeft() + deltaX
    @set 'scrollLeft', scrollLeft
    event.preventDefault()

`export default FooterTableContainer`
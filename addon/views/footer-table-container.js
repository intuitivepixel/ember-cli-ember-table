import Ember from 'ember';
import MouseWheelHandlerMixin from '../mixins/mouse-wheel-handler-mixin';
import TouchMoveHandlerMixin from '../mixins/touch-move-handler-mixin';
import ShowHorizontalScrollMixin from '../mixins/show-horizontal-scroll-mixin';
import TableContainer from '../views/table-container';

/* jshint unused:false */
const {computed} = Ember;

export default TableContainer.extend(MouseWheelHandlerMixin, TouchMoveHandlerMixin, ShowHorizontalScrollMixin, {
  templateName: 'footer-container',
  classNames: ['ember-table-table-container', 'ember-table-fixed-table-container', 'ember-table-footer-container'],
  styleBindings: 'top',
  height: Ember.computed.alias('controller.footerHeight'),
  width: Ember.computed.alias('controller._tableContainerWidth'),
  scrollLeft: Ember.computed.alias('controller._tableScrollLeft'),
  top:  computed(
    'controller._bodyHeight',
    'controller._headerHeight',
    'controller._tableContentHeight', function() {
      let headerHeight = this.get('controller._headerHeight');
      let contentHeight = this.get('controller._tableContentHeight') + headerHeight;
      let bodyHeight = this.get('controller._bodyHeight') + headerHeight;
      if (contentHeight < bodyHeight) {
        return contentHeight;
      } else {
        return bodyHeight;
      }
  }),
  onMouseWheel: function(event, delta, deltaX, deltaY) {
    var scrollLeft;
    scrollLeft = this.$('.ember-table-right-table-block').scrollLeft() + deltaX;
    this.set('scrollLeft', scrollLeft);
    return event.preventDefault();
  },
  onTouchMove: function(event, deltaX, deltaY) {
    var scrollLeft;
    scrollLeft = this.$('.ember-table-right-table-block').scrollLeft() + deltaX;
    this.set('scrollLeft', scrollLeft);
    return event.preventDefault();
  }
});

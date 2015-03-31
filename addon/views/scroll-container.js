import Ember from 'ember';
import ScrollHandlerMixin from '../mixins/scroll-handler-mixin';
import StyleBindingsMixin from '../mixins/style-bindings-mixin';

export default Ember.View.extend(StyleBindingsMixin, ScrollHandlerMixin, {
  templateName: 'scroll-container',
  classNames: ['ember-table-scroll-container'],
  styleBindings: ['left', 'width', 'height'],
  scrollElementSelector: '.antiscroll-inner',
  width: Ember.computed.alias('controller._scrollContainerWidth'),

  /* 10 is the height of the horizontal scrollbar */
  height: 10,
  left: Ember.computed.alias('controller._fixedColumnsWidth'),
  scrollTop: Ember.computed.alias('controller._tableScrollTop'),
  scrollLeft: Ember.computed.alias('controller._tableScrollLeft'),

  /*
  HACK: onScrollLeftDidChange will not fire unless scrollLeft has been get
  at least once. Therefore, we want to call onScrollLeftDidChange in
  didInsertElement
   */
  didInsertElement: function() {
    this._super();
    return this.onScrollLeftDidChange();
  },

  /* `event` here is a jQuery event */
  onScroll: function(event) {
    this.set('scrollLeft', event.target.scrollLeft);
    return event.preventDefault();
  },
  onScrollLeftDidChange: Ember.observer(function() {
    var selector;
    selector = this.get('scrollElementSelector');
    return this.$(selector).scrollLeft(this.get('scrollLeft'));
  }, 'scrollLeft', 'scrollElementSelector')
});

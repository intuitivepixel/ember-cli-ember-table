import Ember from 'ember';
import StyleBindingsMixin from '../mixins/style-bindings-mixin';

/* jshint unused:false */

var LazyContainerView;

LazyContainerView = Ember.ContainerView.extend(StyleBindingsMixin, {
  classNames: 'lazy-list-container',
  styleBindings: ['height'],
  content: null,
  itemViewClass: null,
  rowHeight: null,
  scrollTop: null,
  startIndex: null,

  init: function() {
    this._super();
    return this.onNumChildViewsDidChange();
  },

  height: Ember.computed(function() {
    return this.get('content.length') * this.get('rowHeight');
  }).property('content.length', 'rowHeight'),

  numChildViews: Ember.computed(function() {
    return this.get('numItemsShowing') + 2;
  }).property('numItemsShowing'),

  onNumChildViewsDidChange: Ember.observer(function() {
    var itemViewClass, newNumViews, numViewsToInsert, oldNumViews, view, viewsToAdd, viewsToRemove, _i, _results;
    view = this;

    /* We are getting the class from a string e.g. "Ember.Table.Row" */
    itemViewClass = this.get('itemViewClass');
    if (typeof itemViewClass === 'string') {
      if (/[A-Z]+/.exec(itemViewClass)) {

        /* Global var lookup - 'App.MessagePreviewView' */
        itemViewClass = Ember.get(Ember.lookup, itemViewClass);
      } else {

        /* Ember CLI Style lookup - 'message/preview' */
        itemViewClass = this.container.lookupFactory("view:" + itemViewClass);
      }
    }
    newNumViews = this.get('numChildViews');
    if (!(itemViewClass && newNumViews)) {
      return;
    }
    oldNumViews = this.get('length');
    numViewsToInsert = newNumViews - oldNumViews;

    /* if newNumViews < oldNumViews we need to remove some views */
    if (numViewsToInsert < 0) {
      viewsToRemove = this.slice(newNumViews, oldNumViews);
      return this.removeObjects(viewsToRemove);
    } else if (numViewsToInsert > 0) {

      /* if oldNumViews < newNumViews we need to add more views */
      viewsToAdd = [];
      for (var i = numViewsToInsert - 1; i >= 0; i--) {
        viewsToAdd.push(view.createChildView(itemViewClass));
      }

      return this.pushObjects(viewsToAdd);
    }
  }, 'numChildViews', 'itemViewClass'),

  /*
  TODO(Peter): Consider making this a computed... binding logic will go
  into the LazyItemMixin
   */
  viewportDidChange: Ember.observer(function() {
    var clength, content, numShownViews, startIndex;
    content = this.get('content') || [];
    clength = content.get('length');
    numShownViews = Math.min(this.get('length'), clength);
    startIndex = this.get('startIndex');

    /*
    this is a necessary check otherwise we are trying to access an object
    that doesn't exists
     */
    if (startIndex + numShownViews >= clength) {
      startIndex = clength - numShownViews;
    }
    if (startIndex < 0) {
      startIndex = 0;
    }
    return this.forEach(function(childView, i) {

      /*
      for all views that we are not using... just remove content
      this makes them invisble
       */
      var item, itemIndex;
      if (i >= numShownViews) {
        childView = this.objectAt(i);
        childView.set('content', null);
        return;
      }
      itemIndex = startIndex + i;
      childView = this.objectAt(itemIndex % numShownViews);
      item = content.objectAt(itemIndex);
      if (!childView.isAttrNode && item !== childView.get('content')) {
        childView.teardownContent();
        childView.set('itemIndex', itemIndex);
        childView.set('content', item);
        return childView.prepareContent();
      }
    }, this);
  }, 'content.length', 'length', 'startIndex')
});

export default LazyContainerView;

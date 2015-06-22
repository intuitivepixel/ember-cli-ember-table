import Ember from 'ember';
import StyleBindingsMixin from '../mixins/style-bindings-mixin';
import RowArrayController from '../controllers/row';
import RowDefinition from '../row-definition';
import { addResizeListener } from '../resize-detection';

/* global $ */

var EmberTableComponent;

EmberTableComponent = Ember.Component.extend(StyleBindingsMixin, {
  classNames: ['ember-table-tables-container'],
  classNameBindings: ['enableContentSelection:ember-table-content-selectable'],

  /*
   * ---------------------------------------------------------------------------
   * API - Inputs
   * ---------------------------------------------------------------------------
   */

  /*
  Values which are bound to the table's style attr. See
  `Ember.StyleBindingsMixin` documentation for more details.
   */
  styleBindings: ['height'],

  /*
  Attributes on the element which are bound the component values
   */
  attributeBindings: ['tabIndex'],


  /*
    Setting tab index to -1 removes the element from being tab to. This is
    required to allow keyboard navigation.
   */
  tabIndex: -1,

  /*
  An array of row objects. Usually a hash where the keys are column names and
  the values are the rows's values. However, could be any object, since each
  column can define a function to return the column value given the row
  object. See `Ember.Table.ColumnDefinition.getCellContent`.
   */
  content: null,

  /*
  An array of column definitions: see `Ember.Table.ColumnDefinition`. Allows
  each column to have its own configuration.
   */
  columns: null,

  /*
  The number of fixed columns on the left side of the table. Fixed columns
  are always visible, even when the table is scrolled horizontally.
   */
  numFixedColumns: 0,

  /*
  The number of footer rows in the table. Footer rows appear at the bottom of
  the table and are always visible.
  TODO(new-api): Rename to `numFooterRows`
   */
  numFooterRow: 0,

  /*
  The row height in pixels. A consistent row height is necessary to calculate
  which rows are being shown, to enable lazy rendering.
  TODO: Currently must be kept in sync with the LESS file.
   */
  rowHeight: 30,

  /*
  The minimum header height in pixels. Headers will grow in height if given
  more content than they can display.
  TODO: Currently must be kept in sync with the LESS file.
   */
  minHeaderHeight: 30,

  /*
  The footer height in pixels.
  TODO: Currently must be kept in sync with the LESS file.
   */
  footerHeight: 30,

  /* Enables or disables the header block. */
  hasHeader: true,

  /*
  Enables or disables the footer block.
  TODO(new-api): Default to no
   */
  hasFooter: true,

  /*
  If true, columns with `canAutoResize=true` (the default setting) will
  attempt to fill the width of the table when possible. After a column is
  manually resized, any other columns with `canAutoResize=true` will
  distribute the change in width between them. Once manually resized, a
  column will no longer automatically resize.
   */
  forceFillColumns: false,

  /*
  Allow the columns to be rearranged by drag-and-drop. Only columns with
  `isSortable=true` (the default setting) will be affected.
   */
  enableColumnReorder: true,

  /* Allow users to select the content of table cells. */
  enableContentSelection: false,

  /*
  Sets which row selection behavior to follow. Possible values are 'none'
  (clicking on a row does nothing), 'single' (clicking on a row selects it
  and deselects other rows), and 'multiple' (multiple rows can be selected
  through ctrl/cmd-click or shift-click).
   */
  selectionMode: 'single',

  /*
   * ---------------------------------------------------------------------------
   * API - Outputs
   * ---------------------------------------------------------------------------
   */

  /*
  An array of the rows currently selected. If `selectionMode` is set to
  'single', the array will contain either one or zero elements.
   */
  selection: Ember.computed(function(key, val) {
    var content, _i, _len, _ref, _ref1;
    if (arguments.length > 1 && val) {
      if (this.get('selectionMode') === 'single') {
        this.get('persistedSelection').clear();
        this.get('persistedSelection').addObject(this.findRow(val));
      } else {
        this.get('persistedSelection').clear();
        for (_i = 0, _len = val.length; _i < _len; _i++) {
          content = val[_i];
          this.get('persistedSelection').addObject(this.findRow(content));
        }
      }
      this.get('rangeSelection').clear();
    }
    if (this.get('selectionMode') === 'single') {
      return (_ref = this.get('_selection')) != null ? (_ref1 = _ref[0]) != null ? _ref1.get('content') : void 0 : void 0;
    } else {
      return this.get('_selection').toArray().map(function(row) {
        return row.get('content');
      });
    }
  }).property('_selection.[]', 'selectionMode'),

  /*
   * ---------------------------------------------------------------------------
   * Internal properties
   * ---------------------------------------------------------------------------
   */
  init: function() {
    this._super();
    if (!$.ui) {
      throw 'Missing dependency: jquery-ui';
    }
    if (!$().mousewheel) {
      throw 'Missing dependency: jquery-mousewheel';
    }
    if (!$().antiscroll) {
      throw 'Missing dependency: antiscroll.js';
    }
  },

  /* TODO: Document */
  actions: {
    addColumn: Ember.K,
    sortByColumn: function(column) {
      this.sendAction('sortByColumn', column);
    }
  },

  height: Ember.computed.alias('_tablesContainerHeight'),

  /*
  TODO(new-api): eliminate view alias
  specify the view class to use for rendering the table rows
   */
  tableRowView: 'table-row',
  tableRowViewClass: Ember.computed.alias('tableRowView'),

  onColumnSort: function(column, newIndex) {
    var columns;
    columns = this.get('tableColumns');
    columns.removeObject(column);
    return columns.insertAt(newIndex, column);
  },

  /* An array of Ember.Table.Row computed based on `content` */
  bodyContent: Ember.computed(function() {
    return RowArrayController.create({
      target: this,
      parentController: this,
      container: this.get('container'),
      itemController: RowDefinition,
      content: this.get('content')
    });
  }).property('content'),

  /* An array of Ember.Table.Row */
  footerContent: Ember.computed(function(key, value) {
    if (value) {
      return value;
    } else {
      return Ember.A();
    }
  }).property(),

  fixedColumns: Ember.computed(function() {
    var columns, numFixedColumns;
    columns = this.get('columns');
    if (!columns) {
      return Ember.A();
    }
    numFixedColumns = this.get('numFixedColumns') || 0;
    columns = columns.slice(0, numFixedColumns) || [];
    this.prepareTableColumns(columns);
    return columns;
  }).property('columns.@each', 'numFixedColumns'),

  tableColumns: Ember.computed(function() {
    var columns, numFixedColumns;
    columns = this.get('columns');
    if (!columns) {
      return Ember.A();
    }
    numFixedColumns = this.get('numFixedColumns') || 0;
    columns = columns.slice(numFixedColumns, columns.get('length')) || [];
    this.prepareTableColumns(columns);
    return columns;
  }).property('columns.@each', 'numFixedColumns'),

  prepareTableColumns: function(columns) {
    return columns.setEach('controller', this);
  },

  /*
   * ---------------------------------------------------------------------------
   * View concerns
   * ---------------------------------------------------------------------------
   */
  didInsertElement: function() {
    this._super();
    this.set('_tableScrollTop', 0);
    return this.elementSizeDidChange();
  },

  addResizeListener: function() {
    addResizeListener(this.get('element'), Ember.run.bind(this, this.elementSizeDidChange));
  }.on("didInsertElement"),

  elementSizeDidChange: function() {
    if ((this.get('_state') || this.get('state')) !== 'inDOM') {
      return;
    }
    this.set('_width', this.$().parent().outerWidth());
    this.set('_height', this.$().parent().outerHeight());

    this.updateLayout();
  },

  updateLayout: function() {

    /* updating antiscroll */
    if ((this.get('_state') || this.get('state')) !== 'inDOM') {
      return;
    }
    if (this.get('forceFillColumns')) {
      this.doForceFillColumns();
    }

    /*
    we need to wait for the table to be fully rendered before antiscroll can
    be used
     */
    Ember.run.next(this, this.rebuildAntiscroll);
  },

  rebuildAntiscroll() {
    this.$('.antiscroll-wrap').antiscroll().data('antiscroll').rebuild();
  },

  doForceFillColumns: function() {

    /* Expand the columns if there's extra space */
    var additionWidthPerColumn, availableContentWidth, columnsToResize, contentWidth, fixedColumnsWidth, remainingWidth, tableColumns, totalWidth;
    totalWidth = this.get('_width');
    fixedColumnsWidth = this.get('_fixedColumnsWidth');
    tableColumns = this.get('tableColumns');
    contentWidth = this._getTotalWidth(tableColumns);
    availableContentWidth = totalWidth - fixedColumnsWidth;
    remainingWidth = availableContentWidth - contentWidth;
    columnsToResize = tableColumns.filterProperty('canAutoResize');
    additionWidthPerColumn = Math.floor(remainingWidth / columnsToResize.length);
    return columnsToResize.forEach(function(column) {
      var columnWidth;
      columnWidth = column.get('columnWidth') + additionWidthPerColumn;
      return column.set('columnWidth', columnWidth);
    });
  },

  onBodyContentLengthDidChange: Ember.observer(function() {
    return Ember.run.next(this, function() {
      return Ember.run.once(this, this.updateLayout);
    });
  }, 'bodyContent.length'),

  /*
   * ---------------------------------------------------------------------------
   * Private variables
   * ---------------------------------------------------------------------------
   */
  _tableScrollTop: 0,
  _tableScrollLeft: 0,
  _width: null,
  _height: null,
  _contentHeaderHeight: null,

  _hasVerticalScrollbar: Ember.computed(function() {
    var contentHeight, height;
    height = this.get('_height');
    contentHeight = this.get('_tableContentHeight') + this.get('_headerHeight') + this.get('_footerHeight');
    if (height < contentHeight) {
      return true;
    } else {
      return false;
    }
  }).property('_height', '_tableContentHeight', '_headerHeight', '_footerHeight'),

  _hasHorizontalScrollbar: Ember.computed(function() {
    var contentWidth, tableWidth;
    contentWidth = this.get('_tableColumnsWidth');
    tableWidth = this.get('_width') - this.get('_fixedColumnsWidth');
    if (contentWidth > tableWidth) {
      return true;
    } else {
      return false;
    }
  }).property('_tableColumnsWidth', '_width', '_fixedColumnsWidth'),

  /* tables-container height adjusts to the content height */
  _tablesContainerHeight: Ember.computed(function() {
    var contentHeight, height;
    height = this.get('_height');
    contentHeight = this.get('_tableContentHeight') + this.get('_headerHeight') + this.get('_footerHeight');
    if (contentHeight < height) {
      return contentHeight;
    } else {
      return height;
    }
  }).property('_height', '_tableContentHeight', '_headerHeight', '_footerHeight'),

  /* Actual width of the fixed columns */
  _fixedColumnsWidth: Ember.computed(function() {
    return this._getTotalWidth(this.get('fixedColumns'));
  }).property('fixedColumns.@each.columnWidth'),

  /* Actual width of the (non-fixed) columns */
  _tableColumnsWidth: Ember.computed(function() {

    /*
    Hack: We add 3px padding to the right of the table content so that we can
    reorder into the last column.
     */
    var availableWidth, contentWidth;
    contentWidth = (this._getTotalWidth(this.get('tableColumns'))) + 3;
    availableWidth = this.get('_width') - this.get('_fixedColumnsWidth');
    if (contentWidth > availableWidth) {
      return contentWidth;
    } else {
      return availableWidth;
    }
  }).property('tableColumns.@each.columnWidth', '_width', '_fixedColumnsWidth'),

  _rowWidth: Ember.computed(function() {
    var columnsWidth, nonFixedTableWidth;
    columnsWidth = this.get('_tableColumnsWidth');
    nonFixedTableWidth = this.get('_tableContainerWidth') - this.get('_fixedColumnsWidth');
    if (columnsWidth < nonFixedTableWidth) {
      return nonFixedTableWidth;
    }
    return columnsWidth;
  }).property('_fixedColumnsWidth', '_tableColumnsWidth', '_tableContainerWidth'),

  /* Dynamic header height that adjusts according to the header content height */
  _headerHeight: Ember.computed(function() {
    var contentHeaderHeight, minHeight;
    minHeight = this.get('minHeaderHeight');
    contentHeaderHeight = this.get('_contentHeaderHeight');
    if (contentHeaderHeight < minHeight) {
      return minHeight;
    } else {
      return contentHeaderHeight;
    }
  }).property('_contentHeaderHeight', 'minHeaderHeight'),

  /* Dynamic footer height that adjusts according to the footer content height */
  _footerHeight: Ember.computed(function() {
    if (this.get('hasFooter')) {
      return this.get('footerHeight');
    } else {
      return 0;
    }
  }).property('footerHeight', 'hasFooter'),

  _bodyHeight: Ember.computed(function() {
    var bodyHeight;
    bodyHeight = this.get('_tablesContainerHeight');
    if (this.get('hasHeader')) {
      bodyHeight -= this.get('_headerHeight');
    }
    if (this.get('hasFooter')) {
      bodyHeight -= this.get('footerHeight');
    }
    return bodyHeight;
  }).property('_tablesContainerHeight', '_hasHorizontalScrollbar', '_headerHeight', 'footerHeight', 'hasHeader', 'hasFooter'),

  _tableBlockWidth: Ember.computed(function() {
    return this.get('_width') - this.get('_fixedColumnsWidth');
  }).property('_width', '_fixedColumnsWidth'),

  _fixedBlockWidthBinding: '_fixedColumnsWidth',

  _tableContentHeight: Ember.computed(function() {
    return this.get('rowHeight') * this.get('bodyContent.length');
  }).property('rowHeight', 'bodyContent.length'),

  _tableContainerWidth: Ember.computed(function() {
    return this.get('_width');
  }).property('_width'),

  _scrollContainerWidth: Ember.computed(function() {
    return this.get('_width') - this.get('_fixedColumnsWidth');
  }).property('_width', '_fixedColumnsWidth'),

  _numItemsShowing: Ember.computed(function() {
    return Math.floor(this.get('_bodyHeight') / this.get('rowHeight'));
  }).property('_bodyHeight', 'rowHeight'),

  _startIndex: Ember.computed(function() {
    var index, numContent, numViews, rowHeight, scrollTop;
    numContent = this.get('bodyContent.length');
    numViews = this.get('_numItemsShowing');
    rowHeight = this.get('rowHeight');
    scrollTop = this.get('_tableScrollTop');
    index = Math.floor(scrollTop / rowHeight);

    /* adjust start index so that end index doesn't exceed content length */
    if (index + numViews >= numContent) {
      index = numContent - numViews;
    }
    if (index < 0) {
      return 0;
    } else {
      return index;
    }
  }).property('bodyContent.length', '_numItemsShowing', 'rowHeight', '_tableScrollTop'),

  _getTotalWidth: function(columns, columnWidthPath) {
    var widths;
    if (columnWidthPath == null) {
      columnWidthPath = 'columnWidth';
    }
    if (!columns) {
      return 0;
    }
    widths = columns.getEach(columnWidthPath) || [];
    return widths.reduce((function(total, w) {
      return total + w;
    }), 0);
  },

  /*
   * ---------------------------------------------------------------------------
   * Selection
   * TODO: Make private or reorganize into a new section
   * ---------------------------------------------------------------------------
   */
  isSelected: function(row) {
    return this.get('_selection').contains(row);
  },

  setSelected: function(row, val) {
    this.persistSelection();
    if (val) {
      return this.get('persistedSelection').addObject(row);
    } else {
      return this.get('persistedSelection').removeObject(row);
    }
  },

  /*
  rows that were selected directly or as part of a previous
  range selection (shift-click)
   */
  persistedSelection: Ember.computed(function() {
    return Ember.ArrayProxy.createWithMixins(Ember.MutableArray, {content:[]});
  }),

  /* rows that are part of the currently editable range selection */
  rangeSelection: Ember.computed(function() {
    return Ember.ArrayProxy.createWithMixins(Ember.MutableArray, {content:[]});
  }),

  _selection: Ember.computed(function() {
    return this.get('persistedSelection').toArray().copy().addObjects(this.get('rangeSelection'));
  }).property('persistedSelection.[]', 'rangeSelection.[]'),

  click: function(event) {
    var curIndex, lastIndex, maxIndex, minIndex, row;
    row = this.getRowForEvent(event);
    if (!row) {
      return;
    }
    if (this.get('selectionMode') === 'none') {
      return;
    }
    if (this.get('selectionMode') === 'single') {
      this.get('persistedSelection').clear();
      this.get('persistedSelection').addObject(row);
    } else {
      if (event.shiftKey) {
        this.get('rangeSelection').clear();
        lastIndex = this.rowIndex(this.get('lastSelected'));
        curIndex = this.rowIndex(this.getRowForEvent(event));
        minIndex = Math.min(lastIndex, curIndex);
        maxIndex = Math.max(lastIndex, curIndex);
        this.get('rangeSelection').addObjects(this.get('bodyContent').slice(minIndex, maxIndex + 1));
      } else {
        if (!event.ctrlKey && !event.metaKey) {
          this.get('persistedSelection').clear();
          this.get('rangeSelection').clear();
        } else {
          this.persistSelection();
        }
        if (this.get('persistedSelection').contains(row)) {
          this.get('persistedSelection').removeObject(row);
        } else {
          this.get('persistedSelection').addObject(row);
        }
        this.set('lastSelected', row);
      }
    }
  },


  keyDown: function (e) {
    if (e.keyCode === 38) {
      // arrow up
      e.preventDefault();
      this.selectWithArrow('up', e.shiftKey);
    } else if (e.keyCode === 40) {
      // arrow down
      e.preventDefault();
      this.selectWithArrow('down', e.shiftKey);
    } else if (e.keyCode === 65) {
      // 65 is a
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        this.selectAll();
      }
    }
  },

  selectWithArrow: function (direction) {
    var rowIndex, futureRowIndex, futureSelection;
    if (this.get('selectionMode') === 'none') {
      return;
    }

    // Get the appropriate row index
    if (this.get('selectionMode') === 'single') {
      rowIndex = this.rowIndex(this.get('persistedSelection.lastObject'));
    } else {
      rowIndex = this.rowIndex(this.get('lastSelected'));
    }

    // Calculate new index, defaulting to current index for edge values
    if (direction === 'up' && rowIndex !== 0) {
      futureRowIndex = rowIndex - 1;
    } else if (direction === 'down' && rowIndex !== this.get('bodyContent.length') - 1) {
      futureRowIndex = rowIndex + 1;
    } else {
      futureRowIndex = rowIndex;
    }

    // Clear current selection
    this.get('persistedSelection').clear();
    this.get('rangeSelection').clear();

    // Get new row and persist it. Set lastSelected for book-keeping
    futureSelection = this.get('bodyContent').objectAt(futureRowIndex);
    this.get('persistedSelection').addObject(futureSelection);
    this.set('lastSelected', futureSelection);
  },

  selectAll: function() {
    if (this.get('selectionMode') !== 'multiple') {
      return;
    }

    // Clear current selection
    this.get('persistedSelection').clear();
    this.get('rangeSelection').clear();
    this.set('lastSelected', null);

    // Set new selection
    this.get('rangeSelection').addObjects(this.get('bodyContent'));
    this.set('lastSelected', this.get('bodyContent.lastObject'));
  },

  findRow: function(content) {
    var row, _i, _len, _ref;
    _ref = this.get('bodyContent');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      row = _ref[_i];
      if (row.get('content') === content) {
        return row;
      }
    }
  },

  rowIndex: function(row) {
    var _ref;
    return (_ref = this.get('bodyContent')) != null ? _ref.indexOf(row) : void 0;
  },

  persistSelection: function() {
    this.get('persistedSelection').addObjects(this.get('rangeSelection'));
    return this.get('rangeSelection').clear();
  },

  getRowForEvent: function(event) {
    var $rowView, view;
    $rowView = $(event.target).parents('.ember-table-table-row');
    view = Ember.View.views[$rowView.attr('id')];
    if (view) {
      return view.get('row');
    }
  }
});


/* Ember.Handlebars.helper('ember-table', EmberTableComponent) */

export default EmberTableComponent;

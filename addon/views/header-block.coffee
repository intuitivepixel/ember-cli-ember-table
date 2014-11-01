`import Ember from 'ember';`
`import TableBlock from '../views/table-block';`

HeaderBlock = TableBlock.extend
  classNames:    ['ember-table-header-block']
  itemViewClass: 'header-row'

  content: Ember.computed ->
    [@get('columns')]
  .property 'columns'

`export default HeaderBlock`
`import Ember from 'ember';`
`import TableBlock from 'ember-cli-ember-table/views/table-block';`

HeaderBlock = Ember.Table.TableBlock.extend
  classNames:    ['ember-table-header-block']
  itemViewClass: 'Ember.Table.HeaderRow'

  content: Ember.computed ->
    [@get('columns')]
  .property 'columns'

`export default HeaderBlock`
**NOTE**: This is still a work in progress.

# ember-cli-ember-table

## Test in dummy app locally

* `git clone` this repository
* `cd ember-cli-ember-table`
* `npm install`
* `bower install`
* `ember server`
* Visit http://localhost:4200

## Usage (in consuming ember-cli project)

* `npm install ember-cli-ember-table --save`
* `ember g ember-cli-ember-table`

At this point you can use the component in the templates of your consuming app.

    {{ember-table
      height=400
      hasFooter=false
      enableContentSelection=true
      columnsBinding="columns"
      contentBinding="content"
    }}

You will also need to setup your controller to provide content for the ember-table.

Example controller

    import ColumnDefinition from '../column-definition';

    export default Ember.Controller.extend({
      numRows: 10000,

      columns: function() {
        var dateColumn, openColumn, highColumn, lowColumn, closeColumn;
        dateColumn = ColumnDefinition.create({
          columnWidth: 150,
          textAlign: 'text-align-left',
          headerCellName: 'Date',
          getCellContent: function(row) {
            return row.get('date').toDateString();
          }
        });
        openColumn = ColumnDefinition.create({
          columnWidth: 100,
          headerCellName: 'Open',
          getCellContent: function(row) {
            return row.get('open').toFixed(2);
          }
        });
        highColumn = ColumnDefinition.create({
          columnWidth: 100,
          headerCellName: 'High',
          getCellContent: function(row) {
            return row.get('high').toFixed(2);
          }
        });
        lowColumn = ColumnDefinition.create({
          columnWidth: 100,
          headerCellName: 'Low',
          getCellContent: function(row) {
            return row.get('low').toFixed(2);
          }
        });
        closeColumn = ColumnDefinition.create({
          columnWidth: 100,
          headerCellName: 'Close',
          getCellContent: function(row) {
            return row.get('close').toFixed(2);
          }
        });
        return [dateColumn, openColumn, highColumn, lowColumn, closeColumn];
      }.property(),

      content: function() {
        var generatedContent = [];
        for (var i = 0; i < this.get('numRows'); i++) {
          var date = new Date();
          date.setDate(date.getDate() + i);
          generatedContent.push(Ember.Object.create({
            date: date,
            open:  Math.random() * 100,
            high:  Math.random() * 100 + 50,
            low:   Math.random() * 100 - 50,
            close: Math.random() * 100
          }));
        }
        return generatedContent;
      }.property('numRows'),
    ...


For more information on how to setup `ember-table`, please visit [http://addepar.github.io/ember-table] (http://addepar.github.io/ember-table).

For more information on using `ember-cli`, please visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

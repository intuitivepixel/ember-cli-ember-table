**NOTE**: This is still a work in progress.

# ember-cli-ember-table

## Installation

* `git clone` this repository
* `cd ember-cli-ember-table`
* `npm install`
* `bower install`

## Test in dummy app locally

* `ember server`
* Visit http://localhost:4200

## Usage (in consuming project)

* `npm install --save [path-to-repo]/ember-cli-ember-table`
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
      numRows: 100,
      columns: Ember.computed(function() {
        var closeColumn, dateColumn, highColumn, lowColumn, openColumn;
        dateColumn = ColumnDefinition.create({
          columnWidth: 150,
          textAlign: 'text-align-left',
          headerCellName: 'Date',
          getCellContent: function(row) {
            return row['date'].toDateString();
          }
        });
        openColumn = ColumnDefinition.create({
          columnWidth: 100,
          headerCellName: 'Open',
          getCellContent: function(row) {
            return row['open'].toFixed(2);
          }
        });
        highColumn = ColumnDefinition.create({
          columnWidth: 100,
          headerCellName: 'High',
          getCellContent: function(row) {
            return row['high'].toFixed(2);
          }
        });
        lowColumn = ColumnDefinition.create({
          columnWidth: 100,
          headerCellName: 'Low',
          getCellContent: function(row) {
            return row['low'].toFixed(2);
          }
        });
        closeColumn = ColumnDefinition.create({
          columnWidth: 100,
          headerCellName: 'Close',
          getCellContent: function(row) {
            return row['close'].toFixed(2);
          }
        });
        return [dateColumn, openColumn, highColumn, lowColumn, closeColumn];
      }),
      content: Ember.computed(function() {
        var data = [];
        var item;
        var date;

        for (var i = this.get('numRows') - 1; i >= 0; i--) {
          date = new Date();
          date.setDate(date.getDate() + index);
          item = {
            date: date,
            open: Math.random() * 100 - 50,
            high: Math.random() * 100 - 50,
            low: Math.random() * 100 - 50,
            close: Math.random() * 100 - 50,
            volume: Math.random() * 1000000
          };
          data.push(item);
        };

        return data;
      }).property('numRows')
    });
    ...


For more information on how to setup `ember-table`, please visit [http://addepar.github.io/ember-table] (http://addepar.github.io/ember-table).

For more information on using `ember-cli`, please visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

# Work In Progress!!

# ember-cli-ember-table

## Installation

* `git clone` this repository
* `cd ember-cli-ember-table`
* `npm install`
* `bower install`

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

You will also need to setup your controller to provide content for the ember-table, for more information on how to setup `ember-table`, please visit [http://addepar.github.io/ember-table] (http://addepar.github.io/ember-table).

For more information on using `ember-cli`, please visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

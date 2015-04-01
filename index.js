'use strict';
var fs = require('fs');
module.exports = {
  name: 'ember-cli-ember-table',
  included: function(app) {
    var jqueryuiPrefix ="";
    this._super.included(app);

    app.import('vendor/ember-table.css');
    app.import(app.bowerDirectory + '/antiscroll/antiscroll.css');

    app.import(app.bowerDirectory + '/antiscroll/antiscroll.js');
    app.import(app.bowerDirectory + '/jquery-mousewheel/jquery.mousewheel.js');
    /* jquery-ui 1.11 and jquery-ui 1.10 have different folder structure */
    if (fs.existsSync(app.bowerDirectory + '/jquery-ui/ui/jquery.ui.core.js'))
      jqueryuiPrefix = "jquery.ui.";
    app.import(app.bowerDirectory + '/jquery-ui/ui/' + jqueryuiPrefix + 'core.js');
    app.import(app.bowerDirectory + '/jquery-ui/ui/' + jqueryuiPrefix + 'widget.js');
    app.import(app.bowerDirectory + '/jquery-ui/ui/' + jqueryuiPrefix + 'mouse.js');
    app.import(app.bowerDirectory + '/jquery-ui/ui/' + jqueryuiPrefix + 'resizable.js');
    app.import(app.bowerDirectory + '/jquery-ui/ui/' + jqueryuiPrefix + 'sortable.js');
  }
};

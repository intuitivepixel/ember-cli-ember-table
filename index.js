'use strict';

module.exports = {
  name: 'ember-cli-ember-table',
  included: function(app) {
    this._super.included(app);

    app.import('vendor/ember-table.css');
    app.import(app.bowerDirectory + '/antiscroll/antiscroll.css');

    app.import(app.bowerDirectory + '/antiscroll/antiscroll.js');
    app.import(app.bowerDirectory + '/jquery-mousewheel/jquery.mousewheel.js');
    app.import(app.bowerDirectory + '/jquery-ui/ui/jquery.ui.core.js');
    app.import(app.bowerDirectory + '/jquery-ui/ui/jquery.ui.widget.js');
    app.import(app.bowerDirectory + '/jquery-ui/ui/jquery.ui.mouse.js');
    app.import(app.bowerDirectory + '/jquery-ui/ui/jquery.ui.resizable.js');
    app.import(app.bowerDirectory + '/jquery-ui/ui/jquery.ui.sortable.js');
  }
};

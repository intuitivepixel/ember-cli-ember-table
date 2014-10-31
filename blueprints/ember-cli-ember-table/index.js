var Promise   = require('ember-cli/lib/ext/promise');

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var addonContext = this;

    return this.addBowerPackageToProject('jquery-ui', '1.10.1')
      .then(function() {
        return addonContext.addBowerPackageToProject('jquery-mousewheel', '~3.1.4');
      })
      .then(function() {
        return addonContext.addBowerPackageToProject('antiscroll', 'fa3f81d3c07b647a63036da1de859fcaf1355993');
      });
  }
};
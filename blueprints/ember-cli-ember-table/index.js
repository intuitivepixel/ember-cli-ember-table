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
        return addonContext.addBowerPackageToProject('taras/antiscroll', '92505e0e0d0ef9383630df509883bce558215b22');
      });
  }
};

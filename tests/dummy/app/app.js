import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  LOG_RESOLVER: true,
  LOG_ACTIVE_GENERATION: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true
});

(function() {
  if (!jQuery.browser) {
    (function() {
      var browser, matched, res;
      matched = void 0;
      browser = void 0;

      /*
        * Copyright 2011, John Resig
        * Dual licensed under the MIT or GPL Version 2 licenses.
        * http://jquery.org/license
       */
      jQuery.uaMatch = function(ua) {
        var match;
        ua = ua.toLowerCase();
        match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
        return {
          browser: match[1] || "",
          version: match[2] || "0"
        };
      };
      matched = jQuery.uaMatch(navigator.userAgent);
      browser = {};
      if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
      }
      if(browser.chrome){
      // Chrome is Webkit, but Webkit is also Safari.
        browser.webkit = true;
      } else {
        if (browser.webkit) {
          browser.safari = true;
        }
      }
      res = jQuery.browser = browser;
      return res;
    })();
  }

}).call(this);

loadInitializers(App, config.modulePrefix);

export default App;

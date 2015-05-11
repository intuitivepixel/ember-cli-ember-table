/* global jQuery */

import Ember from 'ember';
var registered = false;

export default {
  name: 'ember-cli-ember-table',
  initialize: function() {

    var VERSION = '0.2.2';
    if (!registered) {
      Ember.libraries.register('Ember Table', VERSION);
      registered = true;
    }

    /*
    jQuery.browser shim that makes HT working with jQuery 1.8+
     */
    if (!jQuery.browser) {
      (function() {
        var browser, matched, res;
        matched = void 0;
        browser = void 0;
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
        if (browser.chrome) {
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

  }
};
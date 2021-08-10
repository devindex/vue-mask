'use strict';var masks=require('src/masks/index'),makeDirective=require('src/directive');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}function _interopNamespace(e){if(e&&e.__esModule)return e;var n=Object.create(null);if(e){Object.keys(e).forEach(function(k){if(k!=='default'){var d=Object.getOwnPropertyDescriptor(e,k);Object.defineProperty(n,k,d.get?d:{enumerable:true,get:function(){return e[k];}});}});}n['default']=e;return Object.freeze(n);}var masks__namespace=/*#__PURE__*/_interopNamespace(masks);var makeDirective__default=/*#__PURE__*/_interopDefaultLegacy(makeDirective);var install = function installPlugin(app) {
  // Register directives
  for (var name in masks__namespace) {
    app.directive(name, makeDirective__default['default'](masks__namespace[name]));
  }
}; // Create module definition for Vue.use()
module.exports=install;
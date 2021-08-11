import * as masks from '@/masks/index';
import makeDirective from '@/directive';

// install function executed by Vue.use()
const install = function installPlugin(app) {
  // Register directives
  for (const name in masks) {
    app.directive(name, makeDirective(masks[name]));
  }
};

export { default as masker } from '@/masker';
export { default as makeDirective } from '@/directive';
export { filterNumbers, filterAlphanumeric, filterLetters } from '@/helpers';

// Create module definition for Vue.use()
export default install;

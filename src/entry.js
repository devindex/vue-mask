import * as masks from 'src/masks/index';
import makeDirective from 'src/directive';

// install function executed by Vue.use()
const install = function installPlugin(app) {
  // Register directives
  for (const name in masks) {
    app.directive(name, makeDirective(masks[name]));
  }
};

// Create module definition for Vue.use()
export default install;
import {install} from './install';

export default {install};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({install});
}

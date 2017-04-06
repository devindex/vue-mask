import {getInputElement} from '../helpers';

export default {
  bind(el, {value, expression}, vnode) {
    el = getInputElement(el, vnode);

    const expressionParts = expression.replace(/\[(\d+)]/, '.$1').split('.');

    const updateModelValue = val => {
      let obj = vnode.context;
      let parts = expressionParts.slice(0);
      while (parts.length > 1) {
        obj = obj[parts.shift()];
      }
      return obj[parts.shift()] = val;
    };

    el.addEventListener('input', ({target}) => updateModelValue(target.value), false);

    el.value = value;
  },
  update(el, {value, oldValue}, vnode) {
    if (value !== oldValue) {
      el = getInputElement(el, vnode);
      el.value = value;
    }
  }
}

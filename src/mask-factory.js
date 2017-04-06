import StringMask from "string-mask";
import {_Vue as Vue} from "./install";
import {getCleaner, getInputElement} from "./helpers";

function createHandler({clean, format, formatter}) {
  return ({target, type, isTrusted}) => {
    if (type === 'paste') {
      target.value = '';
    }

    let value = clean(target.value);
    target.value = format({value, formatter});
    target.dataset.value = target.value;

    if (type === 'mask' || isTrusted) {
      target.dispatchEvent(new Event('input'));
    }
  }
}

function defaultFormat({value, formatter}) {
  value = formatter.apply(value);
  return value.trim().replace(/[^0-9]$/, '');
}

function maskFactory(bind) {
  return {
    bind(el, binding, vnode) {
      const mask = bind(el, binding, vnode);

      const clean = getCleaner(mask.clearValue);
      const format = mask.format || defaultFormat;
      const formatter = mask.pattern ? new StringMask(mask.pattern, mask.options || {}) : null;
      const handler = createHandler({clean, format, formatter});

      el = getInputElement(el, vnode);

      el.addEventListener('input', handler, false);
      el.addEventListener('paste', handler, false);
      el.addEventListener('blur', handler, false);
      el.addEventListener('mask', handler, false);

      handler({target: el, type: 'mask'});
    },
    update (el, {}, vnode) {
      el = getInputElement(el, vnode);
      Vue.nextTick(() => {
        const previousValue = el.dataset.value || '';
        if (previousValue !== el.value) {
          el.dispatchEvent(new Event('mask'));
        }
      });
    }
  }
}

export default maskFactory;

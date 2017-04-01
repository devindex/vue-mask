import StringMask from "string-mask";

function maskFactory(fn) {
  const getCleaner = clearValue => {
    if (typeof clearValue === 'function') {
      return clearValue;
    }

    switch (clearValue) {
      case 'number':
        return v => v.replace(/\D/g, '');
        break;
      case 'alpha':
        return v => v.replace(/[^a-zA-Z]/g, '');
        break;
      default:
        return v => v.replace(/[^a-zA-Z0-9]/g, '');
    }
  };

  return {
    bind(el, binding, vnode) {
      const mask = fn(el, binding, vnode);

      let model = null;
      const updateModelValue = val => {
        if (!model) {
          return;
        }

        let obj = vnode.context;
        let str = model.expression.split('.');
        while (str.length > 1) {
          obj = obj[str.shift()];
        }
        return obj[str.shift()] = val;
      };

      const formatter = mask.pattern ? new StringMask(mask.pattern, mask.options || {}) : null;
      const clean = getCleaner(mask.clearValue);

      const format = mask.format || (({value, formatter}) => {
        value = formatter.apply(value);
        return value.trim().replace(/[^0-9]$/, '');
      });

      const handler = event => {
        const {target, type} = event;

        if (type === 'paste') {
          target.value = '';
        }

        const value = clean(target.value);
        target.value = format({value, formatter});
        updateModelValue(target.value);
      };

      if (vnode.tag === 'input') {
        // remove original event listener (v-model)
        el.removeEventListener('input', vnode.data.on['input']);
        model = vnode.data.directives.find(o => o.name === 'model');
      } else {
        // find input element in the component
        el = el.querySelector('input');
        model = vnode.data.directives.find(o => o.name === 'mask-model');
      }

      el.addEventListener('input', e => handler(e), false);
      el.addEventListener('paste', e => handler(e), false);
      el.addEventListener('blur', e => handler(e), false);

      handler({target: el, type: null});
    }
  }
}

export default maskFactory;

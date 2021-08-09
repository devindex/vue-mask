import { getInputElement, createEvent } from './helpers';
import { _Vue as Vue } from './install';

function updater(el, masker) {
  const currentValue = el.value;
  const newValue = masker(currentValue, { el });

  if (newValue !== currentValue) {
    // Get current cursor position
    let position = el.selectionEnd;

    // Find next cursor position
    if (position === currentValue.length) {
      position = newValue.length;
    } else if (position > 0 && position <= newValue.length) {
      const digit = currentValue.charAt(position - 1);

      if (digit !== newValue.charAt(position - 1)) {
        if (digit === newValue.charAt(position)) {
          position += 1;
        } else if (digit === newValue.charAt(position - 2)) {
          position -= 1;
        }
      }
    }

    el.value = newValue;

    if (el === document.activeElement) {
      // Restore cursor position
      el.setSelectionRange(position, position);
    }

    el.dispatchEvent(createEvent('input'));
  }
}

export default function make(maskerFn) {
  let masker;
  let inputEl;

  return {
    bind(el, binding) {
      masker = maskerFn({
        value: binding.value,
        locale: binding.arg || Object.keys(binding.modifiers)[0] || null,
      });

      inputEl = getInputElement(el);

      // const handler = ({ type, isTrusted }) => {
      //   if (type === 'mask' || isTrusted) {
      //     updater(inputEl, masker);
      //   }
      // };

      // el.addEventListener('input', handler, false);
      // el.addEventListener('paste', handler, false);
      // el.addEventListener('blur', handler, false);
      // el.addEventListener('mask', handler, false);

      updater(inputEl, masker);
    },
    update() {
      Vue.nextTick(() => {
        updater(inputEl, masker);
      });
    }
  };
};

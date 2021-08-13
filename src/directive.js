import { getInputElement, createEvent } from './helpers';

function updater(el, masker) {
  const currentValue = el.value;
  const oldValue = el.dataset.value;

  if (oldValue === currentValue) {
    return;
  }

  const newValue = masker(currentValue, { el });

  if (newValue === currentValue) {
    el.dataset.value = currentValue;
    return;
  }

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
  el.dataset.value = newValue;

  if (el === document.activeElement) {
    // Restore cursor position
    el.setSelectionRange(position, position);
  }

  el.dispatchEvent(createEvent('input'));
}

export default function make(maskerFn) {
  const maskerMap = new WeakMap();
  const inputMap = new WeakMap();
  const eventMap = new WeakMap();

  return {
    bind: (el, binding) => {
      const masker = maskerFn({
        value: binding.value,
        locale: binding.arg || Object.keys(binding.modifiers)[0] || null,
      });

      const inputEl = getInputElement(el);

      const eventHandler = ({ isTrusted }) => {
        if (isTrusted) {
          updater(inputEl, masker);
        }
      };

      maskerMap.set(el, masker);
      inputMap.set(el, inputEl);
      eventMap.set(el, eventHandler);

      inputEl.addEventListener('input', eventHandler);

      updater(inputEl, masker);
    },
    componentUpdated(el) {
      updater(inputMap.get(el), maskerMap.get(el));
    },
    unbind(el) {
      el.removeEventListener('input', inputMap.get(el));
      maskerMap.delete(el);
      inputMap.delete(el);
      eventMap.delete(el);
    },
  };
};

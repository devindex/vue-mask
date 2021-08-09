export const getInputElement = (el) => {
  const inputEl =  el.tagName.toLowerCase() !== 'input'
    ? el.querySelector('input:not([readonly])')
    : el;

  if (!inputEl) {
    throw new Error('Mask directive requires at least one input');
  }

  return inputEl;
};

export function createEvent(name) {
  const event = document.createEvent('Event');
  event.initEvent(name, true, true);
  return event;
}

export const filterNumbers = (v) => (
  v.replace(/\D/g, '')
);

export const filterLetters = (v) => (
  v.replace(/[^a-zA-Z]/g, '')
);

export const filterAlphanumeric = (v) => (
  v.replace(/[^a-zA-Z0-9]/g, '')
);

export const parsePreFn = (arg) => {
  if (typeof arg === 'function') {
    return arg;
  }

  switch (arg) {
    case 'filter-number':
      return filterNumbers;
    case 'filter-letter':
      return filterLetters;
    default:
      return filterAlphanumeric;
  }
};

export const parsePostFn = (arg) => {
  if (typeof arg === 'function') {
    return arg;
  }

  return (value) => (
    value.trim().replace(/[^0-9]$/, '')
  );
};

export const getInputElement = (el, vnode) => {
  return vnode.tag === 'input' ? el : el.querySelector('input:not([readonly])');
};

export const filterNumbers = v => v.replace(/\D/g, '');

export const filterLetters = v => v.replace(/[^a-zA-Z]/g, '');

export const filterAlphanumeric = v => v.replace(/[^a-zA-Z0-9]/g, '');

export const getCleaner = clearValue => {
  if (typeof clearValue === 'function') {
    return clearValue;
  }

  switch (clearValue) {
    case 'number':
      return filterNumbers;
      break;
    case 'letter':
      return filterLetters;
      break;
    default:
      return filterAlphanumeric;
  }
};

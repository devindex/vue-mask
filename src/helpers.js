export const getImputElement = (el, vnode) => {
  return vnode.tag === 'input' ? el : el.querySelector('input');
};

export const filterNumbers = v => v.replace(/\D/g, '');

export const filterLetters = v => v.replace(/[^a-zA-Z]/g, '');

export const filterAlphanumeric = v => v.replace(/[^a-zA-Z0-9]/g, '');

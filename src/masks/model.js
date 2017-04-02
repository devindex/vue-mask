function getImputElement(el, vnode) {
  return vnode.tag === 'input' ? el : el.querySelector('input');
}

export default {
  bind(el, {value}, vnode) {
    el = getImputElement(el, vnode);
    el.value = value;
  },
  update(el, {value, oldValue}, vnode) {
    if (value !== oldValue) {
      el = getImputElement(el, vnode);
      el.value = value;
    }
  }
}

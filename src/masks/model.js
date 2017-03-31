export default {
  bind(el, {value}, vnode) {
    if (vnode.tag !== 'input') {
      // find input element in the component
      el = el.querySelector('input');
    }

    el.value = value;
  }
}

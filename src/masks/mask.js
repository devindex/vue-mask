import maskFactory from '../mask-factory';

export default maskFactory((el, {value}) => {
  return {
    pattern: value,
    format({value, formatter}) {
      value = formatter.apply(value);
      return value.trim().replace(/[^a-zA-Z0-9]$/, '');
    }
  }
});

import StringMask from "string-mask";
import maskFactory from "../mask-factory";

const formatters = {
  get us() {
    const phone = new StringMask('(000) 000-0000');

    return {
      format(value) {
        return phone.apply(value);
      }
    }
  },
  get br() {
    const phone = new StringMask('(00) 0000-0000');
    const phone9 = new StringMask('(00) 9 0000-0000');
    const phone0800 = new StringMask('0000-000-0000');

    return {
      format(value) {
        if (value.indexOf('0800') === 0) {
          value = phone0800.apply(value);
        } else if (value.length <= 10) {
          value = phone.apply(value);
        } else {
          value = phone9.apply(value);
        }
        return value;
      }
    }
  }
};

export default maskFactory((el, {arg, modifiers}) => {
  const key = arg || Object.keys(modifiers)[0] || 'us';
  const formatter = formatters[key];

  return {
    clearValue: 'number',
    format({value}) {
      value = formatter.format(value);
      return value.trim().replace(/[^0-9]$/, '');
    }
  }
});

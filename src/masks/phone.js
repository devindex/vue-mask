import StringMask from 'string-mask';
import masker from '../masker';
import { filterNumbers } from '../helpers';

const handlers = {
  get us() {
    const phone = new StringMask('(000) 000-0000');
    return (value) => phone.apply(value);
  },
  get br() {
    const phone = new StringMask('(00) 0000-0000');
    const phone9 = new StringMask('(00) 9 0000-0000');
    const phone0800 = new StringMask('0000-000-0000');

    return (value) => {
      if (value.startsWith('0800'.slice(0, value.length))) {
        return phone0800.apply(value);
      } else if (value.length <= 10) {
        return phone.apply(value);
      }
      return phone9.apply(value);
    }
  }
};

export default masker(({ locale }) => {
  const handler = handlers[locale || 'us'];

  return {
    pre: filterNumbers,
    handler,
  };
});

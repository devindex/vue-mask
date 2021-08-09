import masker from '../masker';
import { filterNumbers } from '../helpers';

const config = {
  us: { thousand: ',', decimal: '.' },
  br: { thousand: '.', decimal: ',' }
};

export default masker(({ locale, value }) => {
  const conf = config[locale || 'us'];

  const patternParts = [`#${conf.thousand}##0`];
  const precision = value || 0;

  if (precision) {
    patternParts.push(
      conf.decimal,
      new Array(value).fill('0').join('')
    );
  }

  return {
    pattern: patternParts.join(''),
    options: { reverse: true },
    pre(value, { delimiter }) {
      if (!value) {
        return '';
      }

      const sign = value.startsWith('-') ? '-' : '';

      const [number, fraction = ''] = value.split(conf.decimal).map(filterNumbers);

      return [sign, delimiter, Number(number), fraction].join('');
    },
    post(value) {
      return value;
    },
  };
});

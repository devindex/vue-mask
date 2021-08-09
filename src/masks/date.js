import masker from '../masker';
import { filterNumbers } from '../helpers';

const patterns = {
  us: '0000-00-00',
  br: '00/00/0000'
};

export default masker(({ locale = null } = {}) => ({
  pattern: patterns[locale || 'us'],
  pre: filterNumbers,
}));

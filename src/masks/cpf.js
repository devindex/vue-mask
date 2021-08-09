import masker from '../masker';
import { filterNumbers } from '../helpers';

export default masker(() => ({
  pattern: '000.000.000-00',
  pre: filterNumbers,
}));

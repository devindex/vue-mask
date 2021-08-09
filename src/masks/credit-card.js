import masker from '../masker';
import { filterNumbers } from '../helpers';

export default masker(() => ({
  pattern: '0000 0000 0000 0000',
  pre: filterNumbers,
}));

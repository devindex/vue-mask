import masker from '../masker';
import { filterNumbers } from '../helpers';

export default masker(() => ({
  pattern: '00:00',
  pre: filterNumbers,
}));

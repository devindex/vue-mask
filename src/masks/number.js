import masker from '../masker';
import { filterNumbers } from '../helpers';

export default masker(() => {
  return {
    pattern: '#0',
    options: { reverse: true },
    pre: filterNumbers
  }
});

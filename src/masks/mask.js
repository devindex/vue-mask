import masker from '../masker';
import { filterAlphanumeric } from '../helpers';

export default masker(({ value: pattern }) => ({
  pattern,
  pre: filterAlphanumeric,
  post: (value) => (
    value.trim().replace(/[^a-zA-Z0-9]$/, '')
  ),
}));

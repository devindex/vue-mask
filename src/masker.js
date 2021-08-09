import StringMask from 'string-mask';
import { parsePostFn, parsePreFn } from './helpers';

const delimiter = '\u00a7';

export default function masker(fn) {
  return (args) => {
    const data = fn(args);

    const pre = parsePreFn('pre' in data ? data.pre : null);
    const post = parsePostFn('post' in data ? data.post : null);

    const formatter = 'pattern' in data && data.pattern
      ? new StringMask(data.pattern, data.options || {})
      : null;

    const handler = 'handler' in data && typeof data.handler === 'function'
      ? data.handler
      : (value) => (formatter ? formatter.apply(value) : value);

    return (str, args = {}) => {
      args = { ...args, delimiter };

      str = pre(str, args);

      let [prefix, value] = (
        !str.includes(delimiter) ? `${delimiter}${str}` : str
      ).split(delimiter);

      value = handler(value, args);

      return post(`${prefix}${value}`, args);
    }
  }
}

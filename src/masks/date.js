import maskFactory from '../mask-factory';

const patterns = {
  us: '0000-00-00',
  br: '00/00/0000'
};

export default maskFactory((el, {arg, modifiers}) => {
  const key = arg || Object.keys(modifiers)[0] || 'us';
  const pattern = patterns[key];

  return {
    pattern,
    clearValue: 'number'
  }
});

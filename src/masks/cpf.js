import maskFactory from '../mask-factory';

export default maskFactory(() => {
  return {
    pattern: '000.000.000-00',
    clearValue: 'number'
  }
});

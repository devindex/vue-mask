import maskFactory from '../mask-factory';

export default maskFactory(() => {
  return {
    pattern: '0000 0000 0000 0000',
    clearValue: 'number'
  }
});

import maskFactory from '../mask-factory';

export default maskFactory(() => {
  return {
    pattern: '00.000.000/0000-00',
    clearValue: 'number'
  }
});

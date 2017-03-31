import maskFactory from "../mask-factory";

export default maskFactory(() => {
  return {
    pattern: '#0',
    options: {reverse: true},
    clearValue: 'number'
  }
});

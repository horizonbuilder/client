module.exports = options => {
  return {
    plugins: {
      precss: {
        import: {
          path: ['./src/styles']
        }
      },
      lost: {},
      'postcss-cssnext': {}
    }
  };
};

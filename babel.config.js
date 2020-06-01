module.exports = {
  plugins: ['lodash'],
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        corejs: { proposals: true, version: 3 },
        loose: true,
        targets: { esmodules: true },
        useBuiltIns: 'entry'
      }
    ]
  ]
};

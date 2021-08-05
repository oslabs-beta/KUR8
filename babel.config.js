module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
  // ignore: ['node_modules', 'build'],
  env: {
    test: {
      presets: [
        // A Babel preset that can automatically determine the Babel plugins and polyfills
        // https://github.com/babel/babel-preset-env
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
            modules: 'commonjs',
            useBuiltIns: false,
            debug: false,
          },
        ],
      ],
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
      ],
    },
  },
};
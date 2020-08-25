module.exports = function (api) {
  var validEnv = ['development', 'production']
  var currentEnv = api.env()
  var isDevelopmentEnv = api.env('development')

  if (!validEnv.includes(currentEnv)) {
    throw new Error(
      'Please specify a valid `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(currentEnv) +
        '.'
    )
  }

  return {
    presets: [
      [
        require('@babel/preset-env').default,
        {
          debug: false,
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false,
          bugfixes: true,
          loose: true,
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [
        require('@babel/preset-react').default,
        {
          development: isDevelopmentEnv,
          useBuiltIns: true,
          corejs: 3,
        },
      ],
    ].filter(Boolean),
    plugins: [
      [
        require('@babel/plugin-proposal-class-properties').default,
        {
          loose: true,
          useBuiltIns: true,
          corejs: 3,
        },
      ],
      require('@babel/plugin-syntax-dynamic-import').default,
      require('@babel/plugin-transform-destructuring').default,
      [
        require('@babel/plugin-proposal-object-rest-spread').default,
        {
          useBuiltIns: true,
          corejs: 3,
        },
      ],
      [
        require('@babel/plugin-transform-runtime').default,
        {
          helpers: false,
          regenerator: true,
          corejs: false,
        },
      ],
      [
        require('@babel/plugin-transform-regenerator').default,
        {
          async: false,
        },
      ],
      require('@loadable/babel-plugin').default,
    ].filter(Boolean),
  }
}

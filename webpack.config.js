module.exports = {
    mode:'development',
    entry: [
      './newFront/Indexjs.js'
    ],
    devtool:'inline-source-map',
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        }
      ]
    }
  }
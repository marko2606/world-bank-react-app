const path = require('path');
const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

module.exports = {
  devtool: "#inline-source-map",
  context: srcPath,
  entry: path.join(srcPath, 'index.js'),
  output: {
      path: buildPath,
      filename: "bundle.js"
  },
  module: {
      loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015', 'stage-2']
            }
          },
          { 
            test: /\.css$/, 
            loader: "style-loader!css-loader" 
          }
      ]
  }
};




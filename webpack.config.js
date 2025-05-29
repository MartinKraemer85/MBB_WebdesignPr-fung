const path = require('path');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');


const apps = ['foodplaner', 'navigation'];  // List of apps with TypeScript files
const getEntryObject = () => {
  const entries = {};

  apps.forEach((app) => {
    const jsPath = `${app}/static/${app}/src/js/`;
    const tsPath = path.join(__dirname, `./${app}/static/${app}/src/ts/**/*.ts`);
    glob.sync(tsPath).forEach((curPath) => {
      const name = jsPath + path.basename(curPath, ".ts");
      entries[name] = curPath;
    });
  })

  return entries;
};

console.log(getEntryObject());

module.exports = {
  entry: getEntryObject(),
  output: {
    filename: '[name].js',  // Output filename based on entry key
    path: path.resolve(__dirname),
  },
  devtool: false,
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, /\.d\.ts$/],
        use: 'ts-loader',
      },
      {
        test: /\.d\.ts$/,  // Ensure .d.ts files are ignored
        use: 'ignore-loader',
      }
    ]
  },
  // this is used to prevent the unnessecary boostrap license file creation (MIT license)
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  externals: {
    'bootstrap': 'bootstrap',
  },
  plugins: [],
};

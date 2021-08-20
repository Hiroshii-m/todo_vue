const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: path.join(__dirname, 'src/js/app.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin([{from: './public' }])
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  }
}
// const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');

// module.exports = {
//   target: 'electron-main',
//   mode: 'development',
//   entry: path.join(__dirname, 'src/js/app.js'),
//   output: {
//     path: path.join(__dirname, 'dist/js'),
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query:{
//           presets: ['@babel/preset-env']
//         }
//       },
//       {
//         test: /\.vue$/,
//         loader: 'vue-loader'
//       },
//       {
//         test: /\.s(c|a)ss$/,
//         use: [
//           'vue-style-loader',
//           'css-loader',
//           {
//             loader: 'sass-loader',
//             // Requires sass-loader@^7.0.0
//             options: {
//               implementation: require('sass'),
//               indentedSyntax: true // optional
//             },
//             // Requires >= sass-loader@^8.0.0
//             options: {
//               implementation: require('sass'),
//               sassOptions: {
//                 indentedSyntax: true // optional
//               },
//             },
//           },
//         ],
//       },
//     ],
//   },
//   plugins: [
//     new VueLoaderPlugin(),
//     new CopyPlugin([{from: './public' }])
//   ],
//   resolve: {
//     modules: [path.join(__dirname, 'src'), 'node_modules'],
//     extensions: ['.js', '.vue'],
//     alias: {
//       vue: 'vue/dist/vue.esm.js' // npm install したvueはtemplete機能のないランタイム限定ビルドなので、こっちを使うようエイリアスをはる
//     }
//   },
//   devServer: {
//     contentBase: path.resolve(__dirname, 'public')
//   }
// };
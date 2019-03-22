var path = require("path");
var config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", '.css']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: path.resolve(__dirname, './node_modules'),
      }
      ,
        {
          test: /\.js$/,
          exclude: path.resolve(__dirname, './node_modules'),
          // include: path.resolve(__dirname, 'src'),
          use: "babel-loader"
        }
      ,
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
watch:true,
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};

module.exports = config;
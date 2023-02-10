const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

const isProduction = process.env.NODE_ENV === "production"

const config = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    open: true,
    host: "localhost"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"]
      },
      {
        test: /\.module.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: true
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".scss"]
  }
}

module.exports = () => {
  if (isProduction) {
    config.mode = "production"
  } else {
    config.mode = "development"
  }
  return config
}

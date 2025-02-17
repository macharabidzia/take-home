// webpack.config.js
module.exports = {
  // ... other config
  module: {
    rules: [
      // ... other rules
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader', // Install worker-loader: npm install worker-loader
          options: {
            // Options for worker-loader if needed
          },
        },
      },
    ],
  },
};

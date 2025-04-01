/** @type {import('next').NextConfig} */
// const TerserPlugin = require('terser-webpack-plugin');

const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  // devIndicators: false,
  // webpack: (config, { isServer, dev }) => {
  //   if (!isServer) {
  //     config.optimization.minimizer = [
  //       new TerserPlugin({
  //         extractComments: false,
  //         terserOptions: {
  //           format: {
  //             comments: false,
  //           },
  //         },
  //       }),
  //     ]
  //   }
  //   return config
  // }
}

module.exports = nextConfig 

import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  docs: {
    autodocs: 'tag'
  },
  webpackFinal: async (config) => {
    // Ensure TS/TSX are transpiled
    config.module = config.module || { rules: [] };
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-react', { runtime: 'automatic' }],
            ['@babel/preset-typescript', { allowDeclareFields: true }],
          ],
        },
      },
    });
    config.resolve = config.resolve || { extensions: [] };
    config.resolve.extensions = Array.from(new Set([ '.ts', '.tsx', '.js', '.jsx', ...(config.resolve.extensions || []) ]));
    return config;
  },
};

export default config;

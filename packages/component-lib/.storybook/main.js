module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  reactOptions: { fastRefresh: true, strictMode: false },
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return config;
  },
};

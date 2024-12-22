import path from 'path';
import { defineConfig } from 'umi';

export default defineConfig({
  favicon: 'favicon.ico',
  dynamicImport: {
    loading: '@/components/LoadingCp',
  },
  dva: {
    immer: true,
  },
  devtool: 'source-map',
  antd: {
    dark: true,
  },
  title: 'v6.dooring',
  base: '/',
  publicPath: '/',
  outputPath: './editor',
  esbuild: {},
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/editor',
          component: '@/pages/editor',
        },
        {
          path: '/preview',
          component: '@/pages/preview',
        },
        { component: '@/pages/404' },
      ],
    },
  ],
  theme: {
    'primary-color': '#409eff',
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    assets: path.resolve(__dirname, 'src/assets/'),
    less: path.resolve(__dirname, 'src/less/'),
  },
});

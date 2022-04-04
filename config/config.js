import os from 'os';
import pageRoutes from './router.config';
import { defineConfig } from 'umi';
import defaultSettings from '../src/defaultSettings';
import { base } from '../src/base';
import webpackPlugin from './plugin.config';
import slash from 'slash2';

const { version, name } = require('../package.json');
const { BUILD_ENV } = process.env;
const { pwa, primaryColor } = defaultSettings;
const { APP_TYPE, TEST } = process.env;

// 针对 preview.pro.ant.design 的 GA 统计代码
// 业务上不需要这个
// if (APP_TYPE === 'site') {
//   plugins.push([
//     'umi-plugin-ga',
//     {
//       code: 'UA-72788897-6',
//     },
//   ]);
// }

export default defineConfig({
  // publicPath: getPublishPath(process.env),
  publicPath: base === '/' ? '/' : './',
  base,
  // outputPath: 'micro',
  // antd: {},
  dva: {
    hmr: true,
  },
  hash: true,
  history: {
    type: 'browser',
  },
  layout: false,
  copy:
    BUILD_ENV === 'dev'
      ? [
          {
            from: '/conf.json',
            to: '/',
          },
        ]
      : [],

  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  // devtool: BUILD_ENV === 'production' ? 'nosources-source-map' : 'source-map',
  devtool: false,
  qiankun: {
    slave: {},
  },
  metas: [
    {
      name: 'x-server-env',
      content: BUILD_ENV,
    },
  ],

  targets: {
    ie: 9,
    edge: 9,
  },
  // 路由配置
  routes: pageRoutes,
  // links: [
  //   { rel: 'icon', href: '/favicon.png' },
  // ],
  title: false,
  theme: {
    'primary-color': primaryColor,
  },
  // Fast Refresh 热更新
  // fastRefresh: {},
  ignoreMomentLocale: true,
  // lessLoader: {
  //   javascriptEnabled: true
  // },
  // cssLoader: {
  //   // 这里的 modules 可以接受 getLocalIdent
  //   modules: {
  //     getLocalIdent: (context, localIdentName, localName) => {
  //       if (
  //         context.resourcePath.includes("node_modules") ||
  //         context.resourcePath.includes("ant.design.pro.less") ||
  //         context.resourcePath.includes("global.less")
  //       ) {
  //         return localName;
  //       }
  //       const match = context.resourcePath.match(/src(.*)/);
  //       if (match && match[1]) {
  //         const antdProPath = match[1].replace(".less", "");
  //         const arr = slash(antdProPath)
  //           .split("/")
  //           .map(a => a.replace(/([A-Z])/g, "-$1"))
  //           .map(a => a.toLowerCase());
  //         return `antd-pro${arr.join("-")}-${localName}`.replace(/--/g, "-");
  //       }
  //       return localName;
  //     }
  //   }
  // },
  manifest: {
    basePath: '/',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  // proxy: {
  //   'https://community-dev.easyj.top/notice/': {
  //     target: 'https://community-dev.easyj.top/',
  //     changeOrigin: true,
  //     // 'pathRewrite': { '^/auth' : '' },
  //   },
  //   'https://gateway.community-sit.easyj.top/user-center/': {
  //     target: 'https://gateway.community-sit.easyj.top/',
  //     changeOrigin: true,
  //     // 'pathRewrite': { '^/auth' : '' },
  //   },
  // },
  // chainWebpack: webpackPlugin,

  // extraBabelIncludes: [
  //   '/node_modules/dnd-core',
  //   '/node_modules/react-dnd',
  //   '/node_modules/react-dnd-html5-backend',
  // ],

  // externals: {
  //   react: "window.React",
  //   "react-dom": "window.ReactDOM",
  //   // moment: 'moment',
  //   // lodash: '_',
  //   antd: "antd"
  // },

  // 引入被 external 库的 scripts
  // 区分 development 和 production，使用不同的产物

  // scripts:
  //   process.env.NODE_ENV === "development"
  //     ? [
  //         // 'https://unpkg.com/browse/moment@2.25.3/moment.js',
  //         // 'https://cdn.jsdelivr.net/npm/lodash@4.17.19/lodash.js',
  //         // 'https://cdn.jsdelivr.net/npm/antd@4.5.2/dist/antd.js',
  //         "https://gw.alipayobjects.com/os/lib/react/17.0.0/umd/react.development.js",
  //         "https://gw.alipayobjects.com/os/lib/react-dom/17.0.0/umd/react-dom.development.js"
  //       ]
  //     : [
  //         // 'https://unpkg.com/browse/moment@2.25.3/min/moment.min.js',
  //         // 'https://cdn.jsdelivr.net/npm/lodash@4.17.19/lodash.min.js',
  //         // 'https://cdn.jsdelivr.net/npm/antd@4.5.2/dist/antd.min.js',
  //         "https://gw.alipayobjects.com/os/lib/react/17.0.0/umd/react.production.min.js",
  //         "https://gw.alipayobjects.com/os/lib/react-dom/17.0.0/umd/react-dom.production.min.js"
  //       ]

  // styles:
  //   process.env.NODE_ENV === 'development'
  //     ? ['https://cdn.jsdelivr.net/npm/antd@4.5.2/dist/antd.css']
  //     : ['https://cdn.jsdelivr.net/npm/antd@4.5.2/dist/antd.min.css'],
});

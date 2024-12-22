// @ts-nocheck
import { plugin } from './plugin';
import * as Plugin_0 from '/Users/apple/Desktop/github/mygithub/v6.dooring.public/src/app.tsx';
import * as Plugin_1 from '/Users/apple/Desktop/github/mygithub/v6.dooring.public/src/.umi/plugin-dva/runtime.tsx';
import * as Plugin_2 from '../plugin-initial-state/runtime';
import * as Plugin_3 from '../plugin-model/runtime';

  plugin.register({
    apply: Plugin_0,
    path: '/Users/apple/Desktop/github/mygithub/v6.dooring.public/src/app.tsx',
  });
  plugin.register({
    apply: Plugin_1,
    path: '/Users/apple/Desktop/github/mygithub/v6.dooring.public/src/.umi/plugin-dva/runtime.tsx',
  });
  plugin.register({
    apply: Plugin_2,
    path: '../plugin-initial-state/runtime',
  });
  plugin.register({
    apply: Plugin_3,
    path: '../plugin-model/runtime',
  });

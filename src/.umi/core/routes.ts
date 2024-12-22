// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/apple/Desktop/github/mygithub/v6.dooring.public/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/LoadingCp';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index' */'@/pages/index'), loading: LoadingComponent}),
    "exact": true
  },
  {
    "exact": false,
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__index' */'@/layouts/index'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/editor",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__editor' */'@/pages/editor'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/preview",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__preview' */'@/pages/preview'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}

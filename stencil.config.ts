import { Config } from '@stencil/core';
import { inlineSvg } from 'stencil-inline-svg';
import { sass } from '@stencil/sass';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://myapp.local/',
    },
  ],
  plugins: [
    inlineSvg(),
    sass({
      injectGlobalPaths: [
        'src/global/styles/main.scss'
      ]
    })
  ]
};

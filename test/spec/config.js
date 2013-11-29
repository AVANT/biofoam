'use strict';

require.config({
  baseUrl: '../.tmp/js/',
  deps: ['runner'],
  paths: {
    spec: '../../test/spec/',
    runner: '../../test/spec/runner',
    appConfig: '../../require_config'
  },
  shim: {
    runner: ['require_config']
  }
});
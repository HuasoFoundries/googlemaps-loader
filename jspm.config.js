SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/"
  },
  browserConfig: {
    "baseURL": "/",
    "paths": {
      "amd-googlemaps-loader/": "src/"
    }
  },
  nodeConfig: {
    "paths": {
      "amd-googlemaps-loader/": ""
    }
  },
  transpiler: false,
  packages: {
    "amd-googlemaps-loader": {
      "main": "systemjs-gmaps.js"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.0",
    "fs": "npm:jspm-nodelibs-fs@0.2.0",
    "jspm-nodelibs-process": "npm:jspm-nodelibs-process@0.2.0",
    "jspm/nodelibs-process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "process": "npm:jspm-nodelibs-process@0.2.0",
    "vm": "npm:jspm-nodelibs-vm@0.2.0"
  },
  packages: {}
});

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
  },
  map: {
    "jspm-nodelibs-process": "npm:jspm-nodelibs-process@0.2.0",
    "jspm/nodelibs-process": "npm:jspm-nodelibs-process@0.2.0"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {},
  packages: {}
});

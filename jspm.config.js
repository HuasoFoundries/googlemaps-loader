SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/"
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
    "npm:*.json"
  ],
  map: {
    "jspm-nodelibs-process": "npm:jspm-nodelibs-process@0.2.0"
  },
  packages: {}
});

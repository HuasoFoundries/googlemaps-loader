SystemJS.config({
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
  packageConfigPaths: [],
  map: {},
  packages: {}
});

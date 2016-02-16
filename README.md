# Google Maps API Loader

This little helpers provide a way to load Google Maps API dinamically with AMD, CommonJS and SystemJS.


### RequireJS installation and config 

If you want to use these helpers with RequireJS, then install it with

```
npm install amd-googlemaps-loader
```

Then add to your config:

```js
requirejs.config({
  "gmaps": {
    "parameters": {
      "v": "3.exp",
      "libraries": "visualization,places,drawing,geometry"
      //, "client": "optional, your client id for google maps for work"
    },
  },

  "map": {
    "*": {
      "gmaps": "path_to/amd-googlemaps-loader/requirejs-gmaps!https://maps.googleapis.com/maps/api/js"
      //, ...other mappings you have...
    }
  }
});
```

### JSPM installation and SystemJS config 

If you're using google maps with JSPM and or SystemJS, install it with:

```
jspm install gmap=npm:amd-googlemaps-loader
```

Then add to your config:

```js
System.config({
  paths: {
      "github:*": "jspm_packages/github/*",
      "npm:*": "jspm_packages/npm/*",
      "gmaps": "https://maps.googleapis.com/maps/api/js"
      //,  ...other paths...
    },

  meta: {
    "gmaps": {
      "build": false,
        "parameters": {
          "v": "3.exp",
          "libraries": "visualization,places,drawing,geometry",
          //, "client": "optional, your client id for google maps for work"
        },
        "loader": "gmap"
    }
    //,  ...other meta if you have ...
  }
});
```

### Usage

After installing and adding proper configs to your loader, use it like so:



```js
define(['gmaps'],function(gmaps) {
  var map=new gmaps.Map(...);

  var marker = new gmaps.Marker(...);
});
```


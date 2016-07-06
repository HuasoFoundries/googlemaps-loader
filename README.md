# Google Maps API Loader

This little helpers provide a way to load Google Maps API dinamically with AMD, CommonJS and SystemJS.

[![npm](https://img.shields.io/npm/dm/amd-googlemaps-loader.svg?style=plastic)](https://www.npmjs.com/package/amd-googlemaps-loader)

Please note that, starting from version 3.24, [Google Maps API requires for you to get an API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) or a
client ID (if you have the old Google Maps for Work Plan) and include said parameter on the URL. 

This means that, eventhought `client` and `key` are optional fields for the next examples, you must
declare one of them or you will get a [NoApiKeys](https://developers.google.com/maps/documentation/javascript/error-messages#deverrorcodes) warning.


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
      //, "key":"optional, API key"
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
    "https://maps.googleapis.com/maps/api/*": {
      "build": false,
      "parameters": {
        "v": "3.exp",
        "libraries": "visualization,places,drawing,geometry",
        //, "client": "optional, your client id for google maps for work"
        //, "key":"optional, API key"
      },
      "loader": "gmap"
    }
    //,  ...other meta if you have ...
  }
});
```




**Note**: *If* npm is unresponsive due to a strange anomaly, you can use the github registry:

```
jspm install gmap=github:huasofoundries/googlemaps-loader
```


### Usage

After installing and adding proper configs to your loader, use it like so:

```js

define([
  'gmaps',
  'jquery'
], function (gmaps, jQuery) {

  jQuery('body').append('<div id="map"/>');
  
  var mapOptions = {
      zoom: 8,
      center: {
        lat: -34.397,
        lng: 150.644
      }
    },
    myMap = new gmaps.Map(document.getElementById('map'), mapOptions);

});

```


The global `google` object will still be accesible in the global namespace since that's how
google exports its library.
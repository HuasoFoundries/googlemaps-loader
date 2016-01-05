var gmapsDecorator = require('./gmaps-decorator');


function appendScriptTag(src) {
  return new Promise(function (resolve, reject) {
    window.__google_maps_callback__ = function () {
      if (window.google.maps) {
        var gmaps = window.google.maps;

        resolve(gmaps);

        return gmapsDecorator(gmaps);
      } else {
        return reject('no gmaps object!');
      }
    }

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = src;
    return document.body.appendChild(script);
  });
}




exports.fetch = function (load) {

  var scriptUrl = load.address.split(/(\?|\.js)+/)[0],
    parameters = load.metadata.parameters,
    paramArray = ['callback=__google_maps_callback__'];


  for (key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      paramArray.push(key + '=' + parameters[key]);
    }
  }

  scriptUrl += '?' + paramArray.join('&');

  return appendScriptTag(scriptUrl)
    .then(function (gmaps) {
      return 'module.exports = google.maps';
    });
};

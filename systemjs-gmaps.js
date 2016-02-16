function appendScriptTag(src) {
    return new Promise(function (resolve, reject) {
        window.__google_maps_callback__ = function () {
            if (window.google.maps) {
                var gmaps = window.google.maps;

                resolve(gmaps);
                return gmaps;
                // if you want to extend google maps, you can do so here
                // gmapsDecorator is just a sample decorator I used to test the loader
                // var gmapsDecorator = require('./gmaps-decorator');
                // return gmapsDecorator(gmaps);
            } else {
                return reject('no gmaps object!');
            }
        };

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


    for (var key in parameters) {
        if (parameters.hasOwnProperty(key) && parameters[key] !== null) {
            paramArray.push(key + '=' + parameters[key]);
        }
    }

    scriptUrl += '?' + paramArray.join('&');

    return appendScriptTag(scriptUrl)
        .then(function (gmaps) {
            return 'module.exports = google.maps';
        });
};

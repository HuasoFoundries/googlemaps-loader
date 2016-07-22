var thePromise = null;

function appendScriptTag(src) {
    if (typeof window.google === "object" && typeof window.google.maps !== "undefined") {
        return Promise.resolve(window.google.maps);
    }

    if (thePromise !== null) {
        return thePromise;
    }
    thePromise = new Promise(function (resolve, reject) {
        window.__google_maps_callback__ = function () {

            if (window.google.maps) {
                var gmaps = window.google.maps;

                resolve(gmaps);
                return gmaps;

            } else {
                return reject('no gmaps object!');
            }
        };
    });
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = src;
    document.body.appendChild(script);

    return thePromise;
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

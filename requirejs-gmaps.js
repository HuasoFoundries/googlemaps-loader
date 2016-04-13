/**
 * This helper returns a functional google object
 */
define(['./es6-promise'], function (ES6Promise) {

    ES6Promise.polyfill();

    function appendScriptTag(src) {
        if (typeof window.google === "object" && typeof window.google.maps !== "undefined") {
            return Promise.resolve(window.google.maps);
        }
        return new Promise(function (resolve, reject) {
            window.__google_maps_callback__ = function () {
                if (window.google.maps) {
                    var gmaps = window.google.maps;

                    resolve(gmaps);
                    return gmaps;
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

    return {

        load: function (name, parentRequire, onload, opt_config) {

            var config = opt_config || {},
                scriptUrl = parentRequire.toUrl(name).split('?')[0],
                parameters = config.gmaps.parameters,
                paramArray = ['callback=__google_maps_callback__'];

            if (config.isBuild) {
                onload(null);
                return;
            }

            for (var key in parameters) {
                if (parameters.hasOwnProperty(key) && parameters[key] !== null) {
                    paramArray.push(key + '=' + parameters[key]);
                }
            }

            scriptUrl += '?' + paramArray.join('&');

            return appendScriptTag(scriptUrl)
                .then(function (gmaps) {
                    return onload(gmaps);
                }).catch(function (e) {
                    return onload.error(e);
                });
        }
    };


});

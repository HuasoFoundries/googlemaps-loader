/* global globalvars:false*/
/**
 * Este helper devuelve un objeto google funcional, y además extiende varias de sus funcionalidades
 */

define(['./es6-promise', './gmaps-decorator'], function (ES6Promise, gmapsDecorator) {

    ES6Promise.polyfill();

    function appendScriptTag(src) {
        return new Promise(function (resolve, reject) {
            window.__google_maps_callback__ = function () {
                if (window.google.maps) {
                    var gmaps = window.google.maps;

                    resolve(gmaps);
                    return gmaps;
                    // if you want to extend google maps, you can do so here
                    // gmapsDecorator is just a sample decorator I used to test the loader
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
                if (parameters.hasOwnProperty(key)) {
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

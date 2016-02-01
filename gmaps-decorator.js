(function (root, factory) {

    if (typeof define === "function" && define.amd) {
        // AMD (+ global for extensions)
        define(function () {
            return factory();
        });
    } else if (typeof module !== 'undefined' && typeof exports === "object") {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser
        root.gmaps = factory();
    }
}(this, function () {

    var gmapsDecorator = function (gmaps) {
        if (gmaps.MVCObject) {


            /**********************************************
             *
             * MVCObject Prototipes
             *
             *********************************************/

            gmaps.MVCObject.prototype.getPosition = function () {
                return this.get('position');
            };

            gmaps.MVCObject.prototype.getGeometry = function () {
                var _this = this;
                return new gmaps.Data.Point(_this.get('position'));
            };


            /*********************************
             *
             * Rectangle Prototipes
             *
             *********************************/
            gmaps.Rectangle.prototype.toBox = function () {
                var bounds = this.getBounds();
                var SW = bounds.getSouthWest();
                var NE = bounds.getNorthEast();
                return ['BOX(', SW.lng(), ' ', SW.lat(), ' , ', NE.lng(), ' ', NE.lat(), ')'].join('');
            };

            gmaps.Rectangle.prototype.getCenter = function () {
                return this.getBounds().getCenter();
            };


            /*********************************
             *
             * LatLng Prototipes
             *
             *********************************/
            gmaps.LatLng.prototype.getCenter = function () {
                return this;
            };
            gmaps.LatLng.prototype.getPosition = function () {
                return this;
            };

            gmaps.LatLng.prototype.toWkt = function () {
                return "POINT(" + Number(this.lng()).toFixed(6) + " " + Number(this.lat()).toFixed(6) + ")";
            };

            gmaps.LatLng.prototype.toJson = function () {
                return {
                    type: 'Point',
                    coordinates: [1 * Number(this.lng()).toFixed(6), 1 * Number(this.lat()).toFixed(6)]
                };
            };

            /*********************************
             *
             * Marker Prototipes
             *
             *********************************/
            gmaps.Marker.prototype.getCenter = function () {
                return this.getPosition();
            };

            gmaps.Marker.prototype.getPath = function () {
                return [this.getPosition()];
            };

            gmaps.Marker.prototype.setProperty = function (key, value) {
                return this.set(key, value);
            };

            gmaps.Marker.prototype.getProperty = function (key) {
                return this.element.get(key);
            };

            /*********************************
             *
             * Polyline Prototipes
             *
             *********************************/
            gmaps.Polyline.prototype.getBounds = function () {
                var bounds = new gmaps.LatLngBounds();
                this.getPath().forEach(function (element, index) {
                    bounds.extend(element);
                });
                return bounds;
            };
            gmaps.Polyline.prototype.getCenter = function () {
                return this.getBounds().getCenter();
            };


            /*********************************
             *
             * Polygon Prototipes
             *
             *********************************/

            gmaps.Polygon.prototype.getBounds = function () {
                var bounds = new gmaps.LatLngBounds();
                this.getPath().forEach(function (element, index) {
                    bounds.extend(element);
                });
                return bounds;
            };

            gmaps.Polygon.prototype.getCenter = function () {
                return this.getBounds().getCenter();
            };
            gmaps.Polygon.prototype.getPosition = function () {
                return this.getBounds().getCenter();
            };
            gmaps.Polygon.prototype.setProperty = function (key, value) {
                return this.set(key, value);
            };
            gmaps.Polygon.prototype.setProperties = function (properties) {
                return this.setOptions(properties);
            };

            gmaps.Polygon.prototype.getArea = function () {

                return gmaps.geometry.spherical.computeArea(this.getPath());
            };

            /*********************************
             *
             * Circle Prototipes
             *
             *********************************/
            gmaps.Circle.prototype.setProperty = function (key, value) {
                return this.set(key, value);
            };

            gmaps.Circle.prototype.getArea = function () {
                var _this = this,
                    radius = _this.getRadius();
                return Math.PI * Math.pow(radius, 2);

            };

        }

        return gmaps;
    };


    return gmapsDecorator;

}));

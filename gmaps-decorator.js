(function (root, factory) {

	if (typeof define === "function" && define.amd) {
		// AMD (+ global for extensions)
		define(['underscore'], function (_) {
			return factory(_);
		});
	} else if (typeof module !== 'undefined' && typeof exports === "object") {
		// CommonJS
		module.exports = factory(require('underscore'));
	} else {
		// Browser
		root.gmaps = factory(root._);
	}
}(this, function (_) {

	var gmapsDecorator = function (gmaps) {
		if (gmaps.MVCObject) {


			gmaps.Rectangle.prototype.toBox = function () {
				var bounds = this.getBounds();
				var SW = bounds.getSouthWest();
				var NE = bounds.getNorthEast();
				return ['BOX(', SW.lng(), ' ', SW.lat(), ' , ', NE.lng(), ' ', NE.lat(), ')'].join('');
			};
			/**********************************************
			 *
			 * MVCObject Prototipes
			 *
			 *********************************************/
			gmaps.MVCObject.prototype.getProperties = function () {
				var self = this;
				return _.omit(_.object(_.keys(self), _.values(self)), ['gm_accessors_', 'gm_bindings_']);
			};
			gmaps.MVCObject.prototype.getPosition = function () {
				return this.get('position');
			};





			gmaps.MVCObject.prototype.getGeometry = function () {
				var self = this;
				return new gmaps.Data.Point(self.get('position'));
			};





			/*********************************
			 *
			 * Rectangle Prototipes
			 *
			 *********************************/
			gmaps.Rectangle.prototype.getCenter = function () {
				return this.getBounds().getCenter();
			};

			gmaps.Rectangle.prototype.getPath = function () {
				return [this.getBounds().getCenter()];
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
			 * Point Prototipes
			 *
			 *********************************/
			gmaps.Point.prototype.getPosition = function () {
				return new gmaps.LatLng(this.y, this.x);
			};
			gmaps.Point.prototype.getCenter = function () {
				return new gmaps.LatLng(this.y, this.x);
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

			//    gmaps.Marker.prototype.fillColor_changed = function () {};
			gmaps.Marker.prototype.fillcolor_changed = function () {};


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

			gmaps.Polyline.prototype.getRadius = function () {
				return 0;
			};



			/*********************************
			 *
			 * Polygon Prototipes
			 *
			 *********************************/
			gmaps.Polygon.prototype.getProperties = function () {
				var self = this;
				return _.omit(_.object(_.keys(self), _.values(self)), ['gm_accessors_', 'gm_bindings_']);
			};
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
			gmaps.Polygon.prototype.getRadius = function () {
				return this.radius || 0;
			};
			gmaps.Polygon.prototype.getVertices = function () {
				return this.getPath().b;
			};

			gmaps.Polygon.prototype.name_changed = function () {};
			gmaps.Polygon.prototype.center_changed = function () {};


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

			gmaps.Circle.prototype.getPaths = function () {
				return new gmaps.MVCArray([this.getPath()]);
			};
			gmaps.Circle.prototype.getVertices = function () {
				return this.getPath();
			};
			gmaps.Circle.prototype.getPath = function () {

				var options = {
					radius: this.getRadius(),
					center: this.getCenter()
				};
				return gmaps.getCirclePath(options);
			};

			gmaps.Circle.prototype.getArea = function () {
				var self = this,
					radius = self.getRadius();
				return Math.PI * radius ^ 2;

			};





			gmaps.Circle.prototype.getProperties = function () {
				var self = this;
				return _.omit(_.object(_.keys(self), _.values(self)), ['gm_accessors_', 'gm_bindings_']);
			};

			gmaps.Circle.prototype.name_changed = function () {};




			gmaps.getCirclePath = function getCirclePath(options) {
				options = options || {};
				_.defaults(options, {
					center: globalmap.getCenter(),
					vertices: 16,
					radius: 100
				});

				var d2r = Math.PI / 180,
					r2d = 180 / Math.PI,
					radius = options.radius,
					earthsradius = 6376467,
					vertices = options.vertices || 16,
					center = options.center.getCenter(),
					thelat = center.lat(),
					thelng = center.lng(),
					rlat = (radius / earthsradius) * r2d,
					rlng = rlat / Math.cos(thelat * d2r),
					extp = [];

				for (var i = 0; i < vertices; i++) {
					var theta = Math.PI * (i / (vertices / 2));
					var ey = thelng + (rlng * Math.cos(theta));
					var ex = thelat + (rlat * Math.sin(theta));
					extp.push({
						lat: 1 * Number(ex).toFixed(6),
						lng: 1 * Number(ey).toFixed(6)
					});
				}
				extp.push(extp[0]);
				return extp;
			};

		}
		return gmaps;
	};


	return gmapsDecorator

}));

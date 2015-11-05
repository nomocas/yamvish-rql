/**  @author Gilles Coomans <gilles.coomans@gmail.com> */
(function() {
	'use strict';
	var rql = require('orql'),
		y = require('yamvish');

	y.rql = rql;

	y.Template.prototype.rql = function(path, name, expr) {
		return this.exec(function(context) {
			context.rql(path, name, expr);
		}, true);
	};

	y.View.prototype.rql = y.Context.prototype.rql = function(path, name, expr) {
		expr = y.interpolable(expr);
		this.data[name] = [];
		var self = this;
		this.subscribe(path, function(type, p, value, key) {
			value = (type === 'push' || type === 'removeAt') ? self.get(path) : value;
			var r = rql(value, expr.__interpolable__ ? expr.output(self) : expr);
			self.set(name, r);
		});
		this.set(name, rql(this.get(path), expr.__interpolable__ ? expr.output(self) : expr));
		if (expr.__interpolable__)
			expr.subscribeTo(this, function(type, p, xpr) {
				self.set(name, rql(self.get(path), xpr));
			});
		return this;
	};

	y.Filter.prototype.rql = function(query) {
		this._queue.push(function(input) {
			return rql(input, query);
		});
		return this;
	};

	module.exports = rql;
})();

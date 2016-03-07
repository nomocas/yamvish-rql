/**  @author Gilles Coomans <gilles.coomans@gmail.com> */
(function() {
	'use strict';
	var rql = require('orql'),
		y = require('yamvish');

	y.rql = rql;

	y.Template.prototype.rql = function(path, name, expr) {
		return this.context(function(context) {
			context.rql(path, name, expr);
		});
	};

	y.Context.prototype.rql = function(path, name, expr) {
		expr = y.interpolable(expr);
		this.data[name] = [];
		var self = this;
		this.subscribe(path, function(value, type) {
			value = (type === 'push' || type === 'removeAt') ? self.get(path) : value;
			var r = rql(value, expr.__interpolable__ ? expr.output(self) : expr);
			self.set(name, r);
		});
		var data = this.get(path);
		if (data)
			this.set(name, rql(data, expr.__interpolable__ ? expr.output(self) : expr));
		if (expr.__interpolable__)
			expr.subscribeTo(this, function(xpr) {
				var data = self.get(path);
				if (data)
					self.set(name, rql(data, xpr));
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

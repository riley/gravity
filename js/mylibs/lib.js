// is it really an array or just an object?
var is_array = function (value) {
	return Object.prototype.toString.apply(value) === '[object Array]';
};

// checks if is object but not null
// since typeof null === 'object'
var is_object = function (value) {
	return value && typeof value === 'object';
};

// checks if something isNaN
var is_number = function (value) {
	return typeof value === 'number' && isFinite(value);
};
var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

// Object.create 
// gets around ugly prototype syntax
if (typeof Object.create !== 'function') {
	Object.create = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}

// add a method to something.
Function.prototype.method = function (name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
		return this;
	}
};

// make javascript's floats into integers
Number.method('integer', function() {
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});

// trim whitespace from a string
String.method('trim', function() {
	return this.replace(/^\s+|\s+$/g, '');
});

Object.method('superior', function(name) {
	var that = this,
		method = that[name];
	return function() {
		return method.apply(that, arguments);
	};
});

// sums an array and returns the result
Object.method('sum', function(arr) {
	if (!is_array(arr)) {
		throw new Error('sum() requires an array');
	}	
	var total = 0, i;
	for (i = 0; i < arr.length; i++) {
		total += arr[i];
	}
	return total;
});

Array.method('reduce', function(f, value) {
	var i;
	for (i = 0; i < this.length; i++) {
		value = f(this[i], value);
	}
	return value;
});

// create a 1D array initialized with values of initial
Array.dim = function(dimension, initial) {
	var a = [], i;
	for (i = 0; i < dimension; i++) {
		a[i] = initial;
	}
	return a;
};

// create a 2d array m by n initialized with values of initial
Array.matrix = function(m, n, initial) {
	var a, i, j, mat = [];
	for (i = 0; i < m; i++) {
		a = [];
		for (j = 0; j < n; j++) {
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat;
};

Array.identity = function(n) {
	var i, mat = Array.matrix(n, n, 0);
	for (i = 0; i < n; i++) {
		mat[i][i] = 1;
	}
	return mat;
};

// create an array of numbers in a range
Number.range = function(b, e, s) {
	var a = [], i;
	
	switch (arguments.length) {
		case 0:
			throw new Error('range() needs at least 1 argument');
			return array;
		case 1:
			b = Math.floor(b);
			for (i = 0; i < b; i++) {
				a[i] = i;
			}
			return a;
		case 2:
			b = Math.floor(b);
			e = Math.floor(e);
			var len = e - b;
			for (i = 0; i < len; i++) {
				a[i] = b++;
			}
			return a;
		case 3:
		default:
			b = Math.floor(b);
			e = Math.floor(e);
			s = Math.floor(s);
			var len = e - b;
			for (i = 0; i < len/s; i++) {
				a[i] = b;
				b += s;
			}
			return a;
	}
}

// for sorting objects by property names
// usage:
// var sortedArray = arrayOfObjects.sort(by('propertyName'));
var by = function (name, minor) {
	return function (o, p) {
		var a, b;
		if (typeof o === 'object' && typeof p === 'object' && o && p) {
			a = o[name];
			b = p[name];
			if (a === b) {
				return typeof minor === 'function' ? minor(o, p) : 0;
			}
			if (typeof a === typeof b) {
				return a < b ? -1 : 1;
			}
			return typeof a < typeof b ? -1 : 1;
		} else {
			throw {
				name: 'Error',
				message: 'Expected an object when sorting by ' + name
			};
		}
	};
};
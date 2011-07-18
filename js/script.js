/* Author: 
Riley Davis.
Use for your own projects. I don't really care.
*/

var circle = function(spec, my) {
	var that, 
		radius = spec.radius,
		canvas = spec.canvas,
		x = spec.x,
		y = spec.y;
		
	my = my || {};
	
	that = {};
	
	that.draw = function() {
		console.log(x, y, radius);
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	};
	
	return that;
}

var canvas = document.getElementById('circles');
var ctx = canvas.getContext('2d');

var b;

for (var i = 0; i < 5; i++) {
	b = circle({
		radius: Math.random() * 50,
		canvas: canvas,
		x: Math.random() * 300,
		y: Math.random() * 300
	});
	b.draw();
}


var ball = circle({ 
				radius: 10,
				canvas: canvas,
				x: 50,
				y: 50 });
				
ball.draw();
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

function deg2Rad(deg) {
	return deg * Math.PI / 180;
}

ctx.beginPath();
for (var i = 0; i <= 6; i++) {
	var radius = 40;
	var angle = i * (360/6);
	var thisX = Math.cos(deg2Rad(angle))*radius+150;
	var thisY = Math.sin(deg2Rad(angle))*radius+150;
	console.log(angle, thisX, thisY);
	ctx.lineTo(thisX, thisY);
}
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.fillStyle = '#ff0000';
ctx.moveTo(150, 150);
ctx.arc(150, 150, 3, 0, Math.PI*2);
ctx.fill();
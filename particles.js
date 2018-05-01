var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var particles = new Array();
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

for (var i = 0; i < 100; i++){
	particles.push(new Particle(WIDTH * Math.random(), HEIGHT * Math.random(), 3 * Math.random(), Math.random(), 6));
}

function Particle(x, y, r, opacity, sides){

	var MAX_R = 3;
	var MIN_R = 0.5;

	this.x = x;
	this.y = y;
	this.r = r;
	this.opacity = opacity;
	this.sides = sides;

	var dx = 4 * Math.random();
	var dy = 4 * Math.random();
	
	if (Math.random() < 0.5) {
		dx *= -1;
	}
	if (Math.random() < 0.5) {
		dy *= -1;
	}
	
	this.drawPart = function() {
		sides = Math.round(3 + 4 * Math.random());
		ctx.beginPath();
		ctx.moveTo (x + r * Math.cos(0), y + r * Math.sin(0));
		for (var i = 0; i <= sides; i++) {
			ctx.lineTo(x + r * Math.cos(i * 2 * Math.PI / sides), y + r * Math.sin(i * 2 * Math.PI / sides));
		}
		opacity += (0.5 - Math.random())+ 0.01;
		ctx.fillStyle = "rgba(200, 200, 200," + opacity + ")";
		ctx.fill();
	}

	this.draw = function() {
		this.drawPart();
			x += dx / Math.pow(r, 2) * Math.random();
			y += dy / Math.pow(r, 2) * Math.random();
		
		if (x > WIDTH || x < 0) {
			dx *= -1;
		}
		if (y > HEIGHT || y < 0) {
			dy *= -1;
		}
		r += (0.5 - Math.random()) / 5;
		
		if (r <= MIN_R) {
			r += Math.random();
		}
		if (r >= MAX_R) {
			r -= Math.random();
		}
	}
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	for (var i = 0; i < particles.length; i++){
		particles[i].draw();
	}
}

setInterval(draw, 80);

window.addEventListener("resize", function() {
		WIDTH = window.innerWidth;
		HEIGHT = window.innerHeight;
        for (var i = 0; i < 100; i++){
			particles.shift();
			particles.push(new Particle(WIDTH * Math.random(), HEIGHT * Math.random(), 3 * Math.random(), 256 * Math.random(), Math.random(), 6));
		}
    });
	


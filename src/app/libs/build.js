export function build(canvas) {
	document.body.appendChild(canvas);
	let resize = function () {
		canvas.style.position = 'absolute';
		canvas.style.top = canvas.style.left = 0;
		canvas.style.width = canvas.style.height = '100%';
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;
	};
	window.addEventListener('resize', () => resize(canvas));
	resize(canvas);
}
export function frame(callback, fps = 60) {
	let requestAnimaFrame =
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (cb) {
			window.setTimeout(cb, 1000 / 30);
		};
	let now;
	let then = Date.now();
	let interval = 1000 / fps;
	let delta;
	let draw = () => {
		requestAnimaFrame(draw);
		now = Date.now();
		delta = now - then;
		if (delta > interval) {
			then = now - (delta % interval);
			callback(now);
		}
	};
	requestAnimaFrame(draw);
}

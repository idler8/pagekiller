import APP from './app/index.js';
import Scene from './main/index.js';
APP.Event.CHECK_KEY_STATE = Symbol();
APP.Event.ADD_TO_STAGE = Symbol();
APP.Event.STEP = Symbol();
APP.Event.STAGE_SORT = Symbol();
console.log(APP);
window.onload = function () {
	let canvas = document.createElement('canvas');
	let context = canvas.getContext('2d');
	APP.Util.build(canvas);

	let canvas2 = document.createElement('canvas');
	let context2 = canvas2.getContext('2d');
	context2.fillStyle = 'green';
	context2.fillRect(-20, -20, 30, 30);
	APP.Util.frame(function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(canvas2, 10, 10);
		// APP.event.emit(APP.Event.CHECK, APP.keyState);
		// APP.event.emit(APP.Event.STEP, context);
	}, 60);
	APP.stage.add(new Scene());
};

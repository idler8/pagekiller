import * as APP from './app/index.js';
import Scene from './main/index.js';
APP.Event.CHECK_KEY_STATE = Symbol();
APP.Event.ADD_TO_STAGE = Symbol();
APP.Event.STEP = Symbol();
APP.Event.STAGE_SORT = Symbol();
console.log(APP);
window.onload = function () {
	let canvas = document.createElement('canvas');
	let context = canvas.getContext('2d');
	APP.Run.build(canvas);
	APP.Run.frame(function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
		// APP.Event.emit(APP.Event.CHECKF_KEY_STATE, APP.keyState);
		// APP.Event.emit(APP.Event.STEP);
	}, 60);
	APP.stage.add(new Scene());
};

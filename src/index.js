import * as APP from './app/index.js';
// import Scene from './main/index.js';
APP.Event.CHECK_KEY_STATE = Symbol();
APP.Event.ADD_TO_STAGE = Symbol();
APP.Event.STEP = Symbol();
APP.Event.STAGE_SORT = Symbol();
console.log(APP);
window.onload = function () {
	let stage = new APP.Stage(new APP.Renderer(), new APP.Container());
	APP.run(function (now) {
		// console.log('30', now);
		//TODO 每帧判断是否需要更新矩阵
		stage.onStep();
	}, 30);
	APP.run(function (now) {
		// console.log('60', now);
		let { context, canvas } = stage.render;
		context.clearRect(0, 0, canvas.width, canvas.height);
		stage.renderNodes.forEach((node) => {
			//TODO 每帧渲染nodes数组
		});
	}, 60);
	APP.run(function (now) {
		// console.log('30', now);
		//TODO 每帧判断是否需要更新矩阵
		console.log(stage.renderNodes);
	}, 1);

	stage.add(new APP.Container(), stage.id); //初始化属性状态
	stage.add(new APP.Container(), stage.id);
	console.log(stage);
};

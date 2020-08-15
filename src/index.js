import * as APP from './app/index.js';
// import Scene from './main/index.js';
APP.Event.CHECK_KEY_STATE = Symbol();
APP.Event.ADD_TO_STAGE = Symbol();
APP.Event.STEP = Symbol();
APP.Event.STAGE_SORT = Symbol();
console.log(APP);
let stage = new APP.Stage(new APP.Renderer(), new APP.Container());

function debugSpeed() {
	let { nodes, render, renderNodes } = stage;
	let { context, canvas } = render;
	let { width, height } = canvas;
	renderNodes.forEach((id) => {
		let node = nodes[id];
		if (!node) return;
		if (node.random) {
			if (Math.random() < 0.1) node.speedX = -node.speedX;
			if (Math.random() < 0.1) node.speedY = -node.speedY;
			node.x += node.speedX;
			node.y += node.speedY;
			if (node.x < 0 || node.x > width) node.x = width / 2;
			if (node.y < 0 || node.y > height) node.y = height / 2;
		}
	});
}
function debugRender() {
	let { nodes, render, renderNodes } = stage;
	let { context, canvas } = render;
	let { width, height } = canvas;
	context.fillStyle = 'red';
	renderNodes.forEach((id) => {
		let node = nodes[id];
		if (!node) return;
		if (!node.random) {
			node.x = Math.random() * width;
			node.y = Math.random() * height;
			node.speedX = 1;
			node.speedY = 1;
			node.random = true;
		}
		context.fillRect(node.x, node.y, 40, 40);
		//TODO 每帧渲染nodes数组
	});
}
window.onload = function () {
	document.body.appendChild(stage.render.canvas);
	APP.run(function (now) {
		// console.log('30', now);
		debugSpeed(); //测试移动
		stage.onStep();
	}, 30);
	APP.run(function (now) {
		// console.log('60', now);
		let { nodes, render, renderNodes } = stage;
		let { context, canvas } = render;
		let { width, height } = canvas;
		context.clearRect(0, 0, width, height);
		debugRender();
	}, 60);
	stage.add(new APP.Container(), stage.id); //初始化属性状态
	stage.add(new APP.Container(), stage.id);
	console.log(stage);
};

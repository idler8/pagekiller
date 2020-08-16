import * as APP from './app/index.js';
import { canvas, stage, context } from './stage.js';
import Scene from './main/index.js';
import Container from './main/container.js';
stage.node({});

// APP.Event.CHECK_KEY_STATE = Symbol();
// APP.Event.ADD_TO_STAGE = Symbol();
// APP.Event.STEP = Symbol();
// APP.Event.STAGE_SORT = Symbol();
function debugSpeed() {
	let { nodes, renderNodes } = stage;
	let { width, height } = canvas;
	renderNodes.forEach((id) => {
		let node = nodes[id];
		if (!node) return;
		if (!node.random) {
			node.x = Math.random() * width;
			node.y = Math.random() * height;
			node.speedX = 1;
			node.speedY = 1;
			node.random = true;
		} else {
			if (Math.random() < 0.1) node.speedX = -node.speedX;
			if (Math.random() < 0.1) node.speedY = -node.speedY;
			node.x += node.speedX;
			node.y += node.speedY;
			if (node.x < 0 || node.x > width) node.x = width / 2;
			if (node.y < 0 || node.y > height) node.y = height / 2;
		}
	});
}
window.onload = function () {
	document.body.appendChild(canvas);
	APP.run(function (now) {
		debugSpeed(); //测试移动
		stage.onStep();
	}, 30);
	APP.run(function (now) {
		let { nodes, renderNodes } = stage;
		let { width, height } = canvas;
		context.clearRect(0, 0, width, height);
		renderNodes.forEach((id) => {
			if (!nodes[id] || !nodes[id].render) return;
			context.setTransform.apply(context, nodes[id].matrix);
			nodes[id].render(context, stage);
		});
	}, 60);
	let scene = new Scene();
	stage.onNodeChange(scene.id, 'pid', stage.id);

	let dom1 = new Container();
	stage.onNodeChange(dom1.id, 'pid', stage.id);
	dom1.render = function (context) {
		context.fillStyle = 'red';
		context.fillRect(this.x, this.y, 40, 40);
	};

	let dom2 = new Container();
	stage.onNodeChange(dom2.id, 'pid', stage.id);
	dom2.render = function (context) {
		context.fillStyle = 'green';
		context.fillRect(this.x, this.y, 40, 40);
	};

	//测试元素销毁
	setTimeout(function () {
		stage.kill(dom1);
	}, 3000);

	//测试元素移除
	setTimeout(function () {
		stage.onNodeChange(dom2.id, 'pid', 0);
	}, 6000);
};
console.log(APP);
console.log(stage);

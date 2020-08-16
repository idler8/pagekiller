import * as APP from './app/index.js';
import { canvas, stage, context } from './stage.js';
import Scene from './main/index.js';
import Player from './main/player.js';
stage.node({}); //挂载根容器
window.onload = function () {
	document.body.appendChild(canvas);
	//60帧的逻辑
	APP.run(function (now) {
		stage.onStep(); //检查渲染列表是否需要更新
		let { nodes, renderNodes } = stage;
		renderNodes.forEach((id) => nodes[id] && nodes[id].onAnimation && nodes[id].onAnimation());
	}, 60);
	//30帧的渲染
	APP.run(function (now) {
		let { nodes, renderNodes, needNodeUpdate } = stage;
		if (!needNodeUpdate) return;
		stage.needNodeUpdate = false;
		console.log('开始渲染');
		let { width, height } = canvas;
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, width, height);
		renderNodes.forEach((id) => nodes[id] && nodes[id].onStep && nodes[id].onStep(context));
	}, 30);
	//游戏业务逻辑
	let scene = new Scene();
	stage.onNodeChange(scene.id, 'pid', stage.id);

	let dom1 = new Player();
	dom1.color = 'red';
	stage.onNodeChange(dom1.id, 'pid', stage.id);

	let dom2 = new Player();
	dom2.color = 'gray';
	stage.onNodeChange(dom2.id, 'pid', stage.id);

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

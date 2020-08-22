import * as APP from './app/index.js';
import stage from './stage.js';
import Scene from './main/index.js';
stage.node({}); //挂载根容器
window.onload = function () {
	stage.run();
	document.body.appendChild(stage.canvas);
	//60帧的逻辑
	APP.run(function (now) {
		//TODO 不在屏幕上的动画，也需要被操作到
		stage.onStep(); //检查渲染列表是否需要更新
		let { nodes, renderNodes } = stage;
		let Resized = stage.resized;
		if (Resized) stage.resized = false;
		renderNodes.forEach((id) => {
			if (!nodes[id]) return;
			if (Resized && nodes[id].onResize) nodes[id].onResize();
			if (nodes[id].onAnimation) nodes[id].onAnimation();
		});
	}, 60);
	//30帧的渲染
	APP.run(function (now) {
		stage.onRender();
	}, 30);
	//游戏业务逻辑
	stage.put(new Scene(), stage);
};
console.log(APP);
console.log(stage);

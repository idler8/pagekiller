import * as APP from './app/index.js';
const stage = new APP.Stage();
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
function resize(canvas) {
	canvas.style.position = 'absolute';
	canvas.style.top = canvas.style.left = 0;
	canvas.style.width = canvas.style.height = '100%';
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	stage.resized = true;
	stage.needNodeUpdate = true;
}

stage.canvas = canvas;
stage.context = context;
stage.onRender = function () {
	let { nodes, renderNodes, needNodeUpdate, context, canvas } = stage;
	if (!needNodeUpdate) return;
	stage.needNodeUpdate = false;
	let { width, height } = canvas;
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, width, height);
	renderNodes.forEach((id) => nodes[id] && nodes[id].onStep && nodes[id].onStep(context));
};
stage.run = function () {
	window.addEventListener('resize', () => resize(canvas));
	resize(canvas);
};
export default stage;

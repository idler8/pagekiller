export { default as run } from './libs/timer.js';
export { default as Event } from './libs/event.js';
export { default as keyState } from './libs/keyboard.js';

class Container {
	constructor() {
		this.id = Container.id ? ++Container.id : (Container.id = 1);
		this.pid = 0;
		this.children = [];

		this.x = 0;
		this.y = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.rotate = 0;
		this.martix = [1, 0, 0, 1, 0, 0];
		this.needUpdate = false; //是否需要更新矩阵
	}
}
//id:{定位/旋转/缩放/矩阵/绘制函数/销毁函数/父ID/子元素数组}
class Renderer {
	constructor() {
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		window.addEventListener('resize', () => this.resize(this.canvas));
		this.resize(this.canvas);
	}
	resize(canvas) {
		canvas.style.position = 'absolute';
		canvas.style.top = canvas.style.left = 0;
		canvas.style.width = canvas.style.height = '100%';
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;
	}
}
class Stage {
	constructor(render, rootContainer) {
		this.id = rootContainer.id;
		this.render = render;
		this.nodes = { [this.id]: rootContainer };
		this.renderNodes = [];
		this.needUpdate = true; //是否需要整理渲染数组
	}
	onNodeChange(id, key, value) {
		let node = this.nodes[id];
		if (!node) return;
		let historyValue = node[key];
		if (historyValue == value) return;
		node[key] = value;
		if (key == 'pid') {
			let historyParent = this.nodes[historyValue];
			if (historyParent) {
				let index = historyParent.children.indexOf(id);
				if (index !== -1) historyParent.children.splice(index, 1);
				this.needUpdate = true;
			}
			//TODO 0和移除
			let parent = this.nodes[value];
			if (parent) {
				parent.children.push(id);
				this.needUpdate = true;
			}
		} else if (key == 'needUpdate') {
			node.children.forEach((child) => this.onNodeChange(child, 'needUpdate', true));
		}
		this.onNodeChange(id, 'needUpdate', true);
	}
	add(node, parent = 0) {
		console.log('appNode', node.id);
		let { nodes } = this;
		let { id } = node;
		nodes[id] = node;
		this.onNodeChange(id, 'pid', parent.id || parent);
	}
	onRenderNodesCheck(id, renderNodes = []) {
		let { nodes } = this;
		if (!nodes[id]) return;
		renderNodes.push(id);
		nodes[id].children.forEach((child) => {
			this.onRenderNodesCheck(child, renderNodes);
		});
	}
	onStep() {
		if (!this.needUpdate) return;
		this.needUpdate = false;
		let renderNodes = [];
		this.onRenderNodesCheck(this.id, renderNodes);
		this.renderNodes = renderNodes;
	}
}
export { Container, Renderer, Stage };

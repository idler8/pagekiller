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
class Stage {
	constructor(rootContainer) {
		this.id = rootContainer.id;
		this.nodes = { [this.id]: rootContainer };
		this.renderNodes = [];
		this.needUpdate = true; //是否需要整理渲染数组
		this.nodeNeedUpdate = true; //存在需要重算的矩阵
	}
	onNodeChange(id, key, value) {
		let node = this.nodes[id];
		if (!node) return;
		let historyValue = node[key];
		if (historyValue == value) return;
		if (key == 'pid') {
			let historyParent = this.nodes[historyValue];
			if (historyParent) {
				let index = historyParent.children.indexOf(id);
				if (index !== -1) historyParent.children.splice(index, 1);
				this.needUpdate = true;
			}
			let parent = this.nodes[value];
			if (parent) {
				parent.children.push(id);
				node[key] = value;
				this.needUpdate = true;
			}
		} else if (key == 'needUpdate') {
			node[key] = value;
			node.children.forEach((child) => this.onNodeChange(child, 'needUpdate', true));
		} else {
			node[key] = value;
		}
		this.onNodeChange(id, 'needUpdate', true);
		this.nodeNeedUpdate = true;
	}
	node(node, parent = 0) {
		let pid = parent.id || parent;
		let { nodes } = this;
		let { id } = node;
		nodes[id] = node;
		this.onNodeChange(id, 'pid', pid);
		//注意：不在屏幕上的parent不能被感知到
		console.log('appNode', id, pid);
		return node;
	}
	kill(node) {
		let id = node.id || node;
		if (id == this.id || !this.nodes[id]) return;
		this.onNodeChange(id, 'pid', 0);
		delete this.nodes[id];
	}
	onRenderNodesCheck(id, renderNodes = []) {
		let { nodes } = this;
		if (!nodes[id]) return;
		renderNodes.push(id);
		let { children } = nodes[id];
		for (let i = 0, len = children.length; i < len; i++) {
			this.onRenderNodesCheck(children[i], renderNodes);
		}
	}
	onStep() {
		let { nodes, needUpdate, nodeNeedUpdate } = this;
		if (needUpdate) {
			console.log('更新渲染节点');
			this.needUpdate = false;
			let renderNodes = [];
			this.onRenderNodesCheck(this.id, renderNodes);
			this.renderNodes = renderNodes;
		}
		if (nodeNeedUpdate) {
			console.log('更新节点矩阵');
			this.nodeNeedUpdate = false;
			//TODO 拆分重算数组
			for (let i = 0, len = this.renderNodes.length; i < len; i++) {
				let node = nodes[this.renderNodes[i]];
				if (!node) return;
				if (!node.needUpdate) return;
				node.needUpdate = false;
				//TODO 计算需要计算矩阵的节点
			}
		}
	}
}
export { Container, Stage };

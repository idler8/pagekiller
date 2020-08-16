export { default as run } from './libs/timer.js';
export { default as Event } from './libs/event.js';
export { default as keyState } from './libs/keyboard.js';
class Stage {
	constructor() {
		this.id = 0;
		this.nodes = {};
		this.renderNodes = [];
		this.needUpdate = true; //是否需要整理渲染数组
		this.nodeNeedUpdate = true; //存在需要重算的矩阵
	}
	onNodeChange(id, key, value) {
		let node = this.nodes[id];
		if (!node) return node;
		let historyValue = node[key];
		if (historyValue == value) return node;
		node[key] = value;
		if (key == 'pid') {
			let historyParent = this.nodes[historyValue];
			if (historyParent) {
				let index = historyParent.children.indexOf(id);
				if (index !== -1) historyParent.children.splice(index, 1);
			}
			let parent = this.nodes[value];
			if (parent) parent.children.push(id);
			this.needUpdate = true;
		} else if (key == 'needUpdate') {
			node.children.forEach((child) => this.onNodeChange(child, 'needUpdate', true));
		}
		this.onNodeChange(id, 'needUpdate', true);
		this.nodeNeedUpdate = true;
		return node;
	}
	node(node) {
		node.isContainer = true;
		node.id = Stage.id ? ++Stage.id : (Stage.id = 1);
		node.pid = 0;
		node.children = [];
		node.needUpdate = true;
		this.nodes[node.id] = node;
		if (!this.id) this.id = node.id;
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
export { Stage };

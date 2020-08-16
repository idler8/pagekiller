export default class Stage {
	constructor() {
		this.id = 0;
		this.nodes = {};
		this.renderNodes = [];
		this.needUpdate = true; //是否需要整理渲染数组
		this.needNodeUpdate = true; //是否需要重新渲染
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
		this.needNodeUpdate = true;
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
		if (!this.needUpdate) return;
		console.log('更新渲染节点');
		this.needUpdate = false;
		let renderNodes = [];
		this.onRenderNodesCheck(this.id, renderNodes);
		this.renderNodes = renderNodes;
	}
}

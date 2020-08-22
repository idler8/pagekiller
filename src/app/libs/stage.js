export default class Stage {
	constructor() {
		this.id = 0;
		this.nodes = {};
		this.renderNodes = [];
		this.needUpdate = true; //是否需要整理渲染数组
		this.needNodeUpdate = true; //是否需要重新渲染
	}
	update(node) {
		let id = node.id || node;
		node = this.nodes[id];
		if (!node || node.needUpdate) return;
		node.needUpdate = true;
		node.children.forEach((child) => this.update(child));
		this.needNodeUpdate = true;
	}
	node(node) {
		node.isContainer = true;
		node.id = Stage.id ? ++Stage.id : (Stage.id = 1); //TODO 删除set
		node.children = []; //TODO 删除set
		node.pid = 0;
		node.needUpdate = true;
		this.nodes[node.id] = node;
		if (!this.id) this.id = node.id;
	}
	put(node, target = 0) {
		let id = node.id || node;
		node = this.nodes[id];
		if (!node) throw '还未挂载的对象';
		let historyParent = this.nodes[node.pid];
		if (historyParent) {
			let index = historyParent.children.indexOf(id);
			if (index !== -1) historyParent.children.splice(index, 1);
		}
		node.pid = target.id || target;
		let parent = this.nodes[node.pid];
		if (parent) parent.children.push(id);
		this.needUpdate = true;
		this.update(node);
		return node;
	}
	kill(node) {
		let id = node.id || node;
		if (id == this.id || !this.nodes[id]) return;
		this.put(id, 0);
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
		this.needUpdate = false;
		let renderNodes = [];
		this.onRenderNodesCheck(this.id, renderNodes);
		this.renderNodes = renderNodes;
	}
}

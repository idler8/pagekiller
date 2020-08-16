import * as APP from '../app/index.js';
import stage from '../stage.js';
const defaultMatrix = new APP.Matrix();
export default class Container {
	constructor() {
		stage.node(this);
		this.x = 0;
		this.y = 0;
		this.rotate = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.matrix = new APP.Matrix();
	}
	onMatrix(parentMatrix) {
		this.needUpdate = false;
		Object.assign(this.matrix.element, parentMatrix.element);
		this.matrix.translate(this.x, this.y);
		this.matrix.rotate(this.rotate);
		this.matrix.scale(this.scaleX, this.scaleY);
		console.log('更新矩阵', this.id);
	}
	onStep(context) {
		let parent = stage.nodes[this.pid];
		if (!parent) return;
		if (this.needUpdate) this.onMatrix(parent.matrix || defaultMatrix);
	}
}

import stage from '../stage.js';
export default class Container {
	constructor() {
		stage.node(this);
		this.x = 0;
		this.y = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.rotate = 0;
		this.martix = [1, 0, 0, 1, 0, 0];
	}
}

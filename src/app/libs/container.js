export default class Container {
	constructor() {
		this.position = { x: 0, y: 0 };
		this.scale = { x: 1, y: 1 };
		this.rotate = 0;
		this.children = [];
		this.context = document.createElement('canvas').getContext('2d');
	}
	add(stage) {
		this.children.push(stage);
	}
	cache() {
		let { position, scale, rotate, children, context } = this;
		let { width, height } = context.canvas;
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, width, height);
		context.translate(position.x, position.y);
		context.rotate(rotate);
        context.scale(scale.x, scale.y);
        
		children.forEach(function (child) {
			if (child.context) context.drawImage(child.context.canvas, 0, 0);
		});
	}
}

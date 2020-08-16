import { canvas, stage } from '../stage.js';
import Container from './container.js';
export default class Player extends Container {
	constructor() {
		super();
		this.color = 'blue';
	}
	onStep(context) {
		super.onStep(context);
		context.setTransform.apply(context, this.matrix.element);
		context.fillStyle = this.color;
		context.fillRect(0, 0, 40, 40);
	}
	onAnimation() {
		let { width, height } = canvas;
		if (!this.random) {
			this.x = Math.random() * width;
			this.y = Math.random() * height;
			this.speedX = 1;
			this.speedY = 1;
			this.random = true;
		} else {
			if (Math.random() < 0.1) this.speedX = -this.speedX;
			if (Math.random() < 0.1) this.speedY = -this.speedY;
			this.x += this.speedX;
			this.y += this.speedY;
			if (this.x < 0 || this.x > width) this.x = width / 2;
			if (this.y < 0 || this.y > height) this.y = height / 2;
		}
		stage.onNodeChange(this.id, 'needUpdate', true);
	}
}

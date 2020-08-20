import stage from '../../stage.js';
import Container from '../../container.js';
export default class Player extends Container {
	constructor() {
		super();
		this.minY = 0;
		this.speed = -1;
	}
	onStep(context) {
		super.onStep(context);
		context.setTransform.apply(context, this.matrix.element);
		context.fillStyle = '#FF1493';
		context.beginPath();
		context.arc(0, this.minY - 80, 20, 0, 2 * Math.PI);
		context.closePath();
		context.fill();
		context.beginPath();
		context.moveTo(0, this.minY - 60);
		context.lineTo(20, this.minY - 50);
		context.lineTo(0, this.minY + 0);
		context.lineTo(-20, this.minY - 50);
		context.closePath();
		context.fill();
	}
	onAnimation() {
		this.minY += this.speed;
		if (this.minY >= 0) this.speed = -1;
		if (this.minY <= -20) this.speed = 1;
		stage.update(this);
	}
}

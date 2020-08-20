import stage from '../../stage.js';
import Container from '../../container.js';
export default class Player extends Container {
	constructor() {
		super();
	}
	onStep(context) {
		super.onStep(context);
		context.setTransform.apply(context, this.matrix.element);
		context.fillStyle = '#FF1493';
		context.beginPath();
		context.arc(0, -80, 20, 0, 2 * Math.PI);
		context.closePath();
		context.fill();
		context.beginPath();
		context.moveTo(0, -60);
		context.lineTo(20, -50);
		context.lineTo(0, 0);
		context.lineTo(-20, -50);
		context.closePath();
		context.fill();
	}
}

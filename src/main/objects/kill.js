import stage from '../../stage.js';
import Container from '../../container.js';
export default class Kill extends Container {
	onStep(context) {
		super.onStep(context);
		context.setTransform.apply(context, this.matrix.element);
		context.strokeStyle = '#000000';
		context.lineWidth = 1;
		context.beginPath();
		context.moveTo(-20, -50);
		context.lineTo(20, -50);
		context.lineTo(20, 50);
		context.lineTo(-20, 50);
		context.closePath();
		context.stroke();
	}
}

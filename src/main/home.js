import stage from '../stage.js';
import Container from '../container.js';
import Computer from './objects/computer.js';
export default class Home extends Container {
	constructor() {
		super();
		let computer = new Computer();
		computer.x = -1080 / 2 + 16 + 32 + 100;
		computer.y = -1080 / 2 + 16 + 32 + 100;
		stage.onNodeChange(computer.id, 'pid', this.id);
	}
	onStep(context) {
		super.onStep(context);
		let wallOut = 1080 / 2 - 16;
		let wallIn = wallOut - 32;
		context.setTransform.apply(context, this.matrix.element);
		context.strokeStyle = '#000000';
		context.lineWidth = 1;
		context.beginPath();
		context.moveTo(-wallOut, -wallOut);
		context.lineTo(wallOut, -wallOut);
		context.lineTo(wallOut, wallOut);
		context.lineTo(-wallOut, wallOut);
		context.closePath();
		context.stroke();

		context.beginPath();
		context.moveTo(-wallIn, -wallIn);
		context.lineTo(wallIn, -wallIn);
		context.lineTo(wallIn, wallIn);
		context.lineTo(-wallIn, wallIn);
		context.closePath();
		context.stroke();
	}
}

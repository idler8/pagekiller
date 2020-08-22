import stage from '../stage.js';
import Container from '../container.js';
import Computer from './objects/computer.js';
import Desktop from './objects/desktop.js';
import Kill from './objects/kill.js';
export default class Home extends Container {
	constructor() {
		super();
		let computer = new Computer();
		computer.x = 0;
		computer.y = -1080 / 2 + 16 + 32 + 100;
		stage.put(computer, this);
		let desktop = new Desktop();
		desktop.x = 0;
		desktop.y = 1080 / 2 - 32 - 100;
		stage.put(desktop, this);
		let kill = new Kill();
		kill.x = 40;
		kill.y = 1080 / 2 - 16 - 32 - 100;
		stage.put(kill, this);
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

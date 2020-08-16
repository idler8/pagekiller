import stage from '../stage.js';
import Container from './container.js';
export default class Player extends Container {
	constructor() {
		super();
	}
	render(context) {
		context.fillStyle = 'yellow';
		context.fillRect(this.x, this.y, 40, 40);
	}
}

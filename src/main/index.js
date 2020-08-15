import { Container } from '../app/index.js';
import stage from '../stage.js';
import Player from './player.js';
export default class Scene extends Container {
	constructor() {
		super();
		stage.node(this, stage);
		stage.node(new Player(), this);
	}
	render(context) {
		context.fillStyle = 'blue';
		context.fillRect(this.x, this.y, 40, 40);
	}
}

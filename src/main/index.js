import stage from '../stage.js';
import Container from './container.js';
import Player from './player.js';
export default class Scene extends Container {
	constructor() {
		super();
		stage.onNodeChange(new Player().id, 'pid', this.id);
	}
	render(context) {
		context.fillStyle = 'blue';
		context.fillRect(this.x, this.y, 40, 40);
	}
}

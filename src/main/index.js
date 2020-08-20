import stage from '../stage.js';
import Container from '../container.js';
import Home from './home.js';
import Player from './player.js';
export default class Scene extends Container {
	constructor() {
		super();
		stage.onNodeChange(new Home().id, 'pid', this.id);
		stage.onNodeChange(new Player().id, 'pid', this.id);
	}
	onResize() {
		this.x = stage.canvas.width / 2;
		this.y = stage.canvas.height / 2;
		let minWidth = Math.min(stage.canvas.width, stage.canvas.height);
		this.scaleX = this.scaleY = minWidth / 1080;
		stage.onNodeChange(this.id, 'needUpdate', true);
		console.log(this);
	}
}

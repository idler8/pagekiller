import stage from '../stage.js';
import Container from '../container.js';
import Home from './home.js';
import Player from './objects/player.js';
export default class Scene extends Container {
	constructor() {
		super();
		this.player = new Player();
		this.onSceneChange(new Home());
	}
	onSceneChange(scene) {
		stage.onNodeChange(this.player.id, 'pid', scene.id);
		if (this.scene) stage.kill(this.scene);
		stage.onNodeChange(scene.id, 'pid', this.id);
		this.scene = scene;
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

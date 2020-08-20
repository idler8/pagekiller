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
		stage.put(this.player, scene);
		if (this.scene) stage.kill(this.scene);
		stage.put(scene, this);
		this.scene = scene;
	}
	onResize() {
		this.x = stage.canvas.width / 2;
		this.y = stage.canvas.height / 2;
		let minWidth = Math.min(stage.canvas.width, stage.canvas.height);
		this.scaleX = this.scaleY = minWidth / 1080;
		stage.update(this);
		console.log(this);
	}
}

import * as APP from '../app/index.js';
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
		this.player.x = this.player.y = 0;
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
	onRender() {}
	onAnimation() {
		let needUpdate = false;
		if (APP.keyState[37]) {
			this.player.x -= 1;
			needUpdate = true;
		}
		if (APP.keyState[39]) {
			this.player.x += 1;
			needUpdate = true;
		}
		if (APP.keyState[38]) {
			this.player.y -= 1;
			needUpdate = true;
		}
		if (APP.keyState[40]) {
			this.player.y += 1;
			needUpdate = true;
		}
		if (needUpdate) stage.update(this.player);
	}
}

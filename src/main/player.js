import APP from '../app/index.js';
export default class Player extends APP.Container {
	constructor() {
		super();
		APP.event.on(APP.Event.ADD_TO_STAGE, this.onAddToStage);
	}
	onAddToStage(evt, world) {
		console.log('我被添加到了场景');
	}
}

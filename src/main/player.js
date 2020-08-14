import { Event } from '../app/index.js';
export default class Player extends Event {
	constructor() {
		super();
		this.on(Event.ADD_TO_STAGE, this.onAddToStage);
	}
	onAddToStage(evt, world) {
		console.log('我被添加到了场景');
	}
}

import { Event } from '../app/index.js';
export default class Scene extends Event {
	constructor() {
		super();
		this.on(Event.ADD_TO_STAGE, this.onAddToStage);
		this.on(Event.CHECK_KEY_STATE, this.onCheckKeyState);
	}
	onAddToStage(evt, world) {
		console.log('场景开始了');
	}
	onCheckKeyState(evt, world) {
		console.log('检查按键状态');
	}
}

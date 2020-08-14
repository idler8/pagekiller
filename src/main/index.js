import APP from '../app/index.js';
export default class Scene extends APP.Container {
	constructor() {
		super();
		APP.event.on(APP.Event.ADD_TO_STAGE, this.onAddToStage);
		APP.event.on(APP.Event.CHECK_KEY_STATE, this.onCheckKeyState);
	}
	onAddToStage(evt, world) {
		console.log('场景开始了');
	}
	onCheckKeyState(evt, world) {
		console.log('检查按键状态');
	}
}

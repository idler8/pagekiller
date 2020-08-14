import * as Run from './libs/build.js';
import Event from './libs/event.js';
import keyState from './libs/event.js';
class Container {
	constructor() {
		this.children = [];
	}
	add(stage) {
		this.children.push(stage);
		this.willSort = true;
	}
}
const stage = new Container();
const event = new Event();
export { Run, Event, keyState, Container, stage, event };

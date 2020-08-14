import * as Util from './libs/build.js';
import Event from './libs/event.js';
import Container from './libs/container.js';
import keyState from './libs/keyboard.js';

const event = new Event();
const stage = new Container();
const APP = { Util, Event, keyState, Container, stage, event };
export default APP;

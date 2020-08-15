import * as APP from './app/index.js';
function resize(canvas) {
	canvas.style.position = 'absolute';
	canvas.style.top = canvas.style.left = 0;
	canvas.style.width = canvas.style.height = '100%';
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
}
const canvas = document.createElement('canvas');
window.addEventListener('resize', () => resize(canvas));
resize(canvas);
const stage = new APP.Stage(new APP.Container());
const context = canvas.getContext('2d');
export { canvas, stage, context };
export default stage;

export default keyState = {};
window.addEventListener('keydown', function (e) {
	if (keyState[e.keyCode]) return;
	keyState[e.keyCode] = true;
});
window.addEventListener('keyup', function (e) {
	if (!keyState[e.keyCode]) return;
	keyState[e.keyCode] = false;
});

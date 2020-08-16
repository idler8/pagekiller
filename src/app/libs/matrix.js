export default class Matrix {
	constructor() {
		this.element = [1, 0, 0, 1, 0, 0];
	}
	//位移
	translate(x, y) {
		let { element } = this;
		element[4] = element[0] * x + element[2] * y + element[4];
		element[5] = element[1] * x + element[3] * y + element[5];
	}
	//旋转
	rotate(a) {
		let { element } = this;
		let s = Math.sin(a),
			c = Math.cos(a);
		let a0 = element[0],
			a1 = element[1],
			a2 = element[2],
			a3 = element[3];
		element[0] = a0 * c + a2 * s;
		element[1] = a1 * c + a3 * s;
		element[2] = a0 * -s + a2 * c;
		element[3] = a1 * -s + a3 * c;
	}
	//缩放
	scale(x, y) {
		let { element } = this;
		element[0] *= x;
		element[1] *= x;
		element[2] *= y;
		element[3] *= y;
	}
	//斜切
	skew(x, y) {
		let { element } = this;
		var tanX = Math.tan(x),
			tanY = Math.tan(y),
			mx0 = element[0],
			mx1 = element[1];
		element[0] += tanY * element[2];
		element[1] += tanY * element[3];
		element[2] += tanX * mx0;
		element[3] += tanX * mx1;
	}
	//倒置
	invert() {
		let { element } = this;
		let aa = element[0],
			ab = element[1],
			ac = element[2],
			ad = element[3],
			atx = element[4],
			aty = element[5];
		var det = aa * ad - ab * ac;
		if (!det) return;
		det = 1.0 / det;
		element[0] = ad * det;
		element[1] = -ab * det;
		element[2] = -ac * det;
		element[3] = aa * det;
		element[4] = (ac * aty - ad * atx) * det;
		element[5] = (ab * atx - aa * aty) * det;
	}
}

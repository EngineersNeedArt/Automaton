// matrix3.js

export class Matrix3 {
	constructor() {
		this.identity();
	}
	
	identity() {
		this.elements = [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1
		];
	}
	
	translate(tx, ty) {
		const translationMatrix = new Matrix3();
		translationMatrix.elements = [
			1, 0, 0,
			0, 1, 0,
			tx, ty, 1
		];
		this.multiply(translationMatrix);
	}
	
	scale(sx, sy) {
		const scaleMatrix = new Matrix3();
		scaleMatrix.elements = [
			sx, 0, 0,
			0, sy, 0,
			0, 0, 1
		];
		this.multiply(scaleMatrix);
	}
	
	rotate(angle) {
		let cos = Math.cos(angle);
		let sin = Math.sin(angle);
		let rotationMatrix = new Matrix3();
		rotationMatrix.elements = [cos, sin, 0, -sin, cos, 0, 0, 0, 1];
		this.multiply(rotationMatrix);
	}
	
	multiply(matrix) {
		const a = this.elements;
		const b = matrix.elements;
		const result = new Array(9);
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				result[row * 3 + col] = 
					a[row * 3 + 0] * b[0 * 3 + col] +
					a[row * 3 + 1] * b[1 * 3 + col] +
					a[row * 3 + 2] * b[2 * 3 + col];
			}
		}
		this.elements = result;
	}
	
	invert() {
		let m = this.elements;
		let det = m[0] * (m[4] * m[8] - m[5] * m[7]) -
				m[1] * (m[3] * m[8] - m[5] * m[6]) +
				m[2] * (m[3] * m[7] - m[4] * m[6]);
		if (det === 0) {
			throw new Error("Matrix is not invertible");
		}
		
		let invDet = 1 / det;
		
		const result = new Array(9);
		result[0] = (m[4] * m[8] - m[7] * m[5]) * invDet;
		result[1] = (m[2] * m[7] - m[1] * m[8]) * invDet;
		result[2] = (m[1] * m[5] - m[2] * m[4]) * invDet;
		result[3] = (m[5] * m[6] - m[3] * m[8]) * invDet;
		result[4] = (m[0] * m[8] - m[2] * m[6]) * invDet;
		result[5] = (m[3] * m[2] - m[0] * m[5]) * invDet;
		result[6] = (m[3] * m[7] - m[6] * m[4]) * invDet;
		result[7] = (m[6] * m[1] - m[0] * m[7]) * invDet;
		result[8] = (m[0] * m[4] - m[3] * m[1]) * invDet;
		
		this.elements = result;
	}
	
	multiplyPoint(point) {
		const m = this.elements;
		const [x, y] = point;
		const tx = m[0] * x + m[3] * y + m[6];
		const ty = m[1] * x + m[4] * y + m[7];
		return [tx, ty];
	}
}

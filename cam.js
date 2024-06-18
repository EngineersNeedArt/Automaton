// cam.js

export class Cam {
	offTime = 0;			// Time in seconds cam outputs minThrow.
	riseTime = 0.5;			// Time in seconds cam takes to rise from 0 to 1.
	holdTime = 0;			// Time in seconds cam outputs 1.
	fallTime = 0.5;			// Time in seconds cam takes to fall from 1 to 0.
	follower = 0;			// Value of follower.
	
	constructor(offTime, riseTime, holdTime, fallTime) {
		this.offTime = offTime;
		this.riseTime = riseTime;
		this.holdTime = holdTime;
		this.fallTime = fallTime;
		this.angle = 0;
	}
	
	_wrapAngle(angle) {
		if ((angle < 0) || (angle > 2 * Math.PI)) {
			angle = angle % (2 * Math.PI);
			if (angle < 0) {
				angle += 2 * Math.PI;
			}
		}
		return angle;
	}
	
	// Method to advance the cam's angle based on elapsed time
	advance(seconds) {
		// Update the angle based on the period and seconds.
		const period = this.offTime + this.riseTime + this.holdTime + this.fallTime;
		this.angle = this._wrapAngle (this.angle + (seconds / period * 2 * Math.PI));
				
		// Calculate the follower position based on the updated angle
		this.calculateFollowerPosition();
		return this.follower;
	}
	
	// Private method to calculate the follower position
	calculateFollowerPosition() {
		// Determine where in the 'cycle' the cam is based on its angle.
		const period = this.offTime + this.riseTime + this.holdTime + this.fallTime;
		var cycle = period * this.angle / (2 * Math.PI);
		
		// Are we in the 'off cycle'?
		if (cycle <= this.offTime) {
			this.follower = 0;
			return;
		}
		
		// Are we in the 'rise cycle'?
		cycle -= this.offTime;
		if (cycle < this.riseTime) {
			this.follower = ((Math.cos (Math.PI * cycle / this.riseTime) * -1) + 1.0) / 2.0;
			return;
		}
		
		// Are we in the 'hold cycle'?
		cycle -= this.riseTime;
		if (cycle < this.holdTime) {
			this.follower = 1;
			return;
		}
		
		// We must be in the  'fall cycle'.
		cycle -= this.holdTime;
		this.follower = (Math.cos (Math.PI * cycle / this.fallTime) + 1.0) / 2.0;
	}
}
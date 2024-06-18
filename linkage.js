// linkage.js

import { Cam } from './cam.js';
import { Sprite } from './sprite.js';

export class Linkage {
	// Define the enum as a static property
    static Movement = {
        X: 'XMovement',
        Y: 'YMovement',
        Angle: 'AngleMovement'
    };
	
	scale = 1;
	offset = 0;
	
	constructor(sprite, cam, movement, scale = 1, offset = 0) {
		this.sprite = sprite;
		this.cam = cam;
		if (!Object.values (Linkage.Movement).includes (movement)) {
			throw new Error (`Invalid movement: ${movement}`);
		}
		this.movement = movement;
		this.scale = scale;
		this.offset = offset;
	}
	
	// Method to advance the cam's angle based on elapsed time
	update() {
		switch (this.movement) {
			case Linkage.Movement.X:
			this.sprite.x = (this.cam.follower * this.scale) + this.offset;
			break;
			
			case Linkage.Movement.Y:
			this.sprite.y = (this.cam.follower * this.scale) + this.offset;
			break;
			
			case Linkage.Movement.Angle:
			this.sprite.angle = (this.cam.follower * this.scale) + this.offset;
			break;
			
			default:
			console.log('Unknown movement. No action performed.');
			break;
		}
	}
}
// sprite.js

import { Matrix3 } from './matrix3.js';

export class Sprite {
	loaded = false;
	x = 0;			// Relative to parent.
	y = 0;			// Relative to parent.
	anchorX = 0;
	anchorY = 0;
	angle = 0;
	image = null;
	parent = null;
	
	constructor(imagePath, anchorX = 0, anchorY = 0) {		
		this.image = new Image();
		this.image.src = imagePath;
		this.anchorX = anchorX;
		this.anchorY = anchorY;
		
		this.loaded = false;
		this.image.onload = () => {
			this.loaded = true;
		};
	}
	
    // Helper function to recursively apply transformations
    applyTransform(context) {
        if (this.parent) {
            this.parent.applyTransform(context);
        }
		
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.translate (-this.anchorX, -this.anchorY);
    }
	
	draw (context) {
		if (this.loaded) {
			context.save();
			
			// Apply all necessary transformations
			this.applyTransform(context);
			
			// Draw the image
			context.drawImage(this.image, 0, 0);
			
			// Restore the context to its original state
			context.restore();
			
			/*
			context.save();
			
			// Apply transformations from parent sprites
			let currentSprite = this;
			while (currentSprite.parent) {
				const parent = currentSprite.parent;
				context.translate (parent.x, parent.y);
				context.rotate (parent.angle);
				context.translate (-parent.anchorX, -parent.anchorY);
				currentSprite = parent;
			}
			
			// Apply transformations for the current sprite
			context.translate(this.x, this.y);
			context.rotate(this.angle);
			context.translate(-this.anchorX, -this.anchorY);
			
			context.drawImage (this.image, 0, 0);
			context.restore();
			*/
			
			/*
			let relX = this.x;
			let relY = this.y;
			if (this.parent) {
				const m = this.parent.matrix ();
				[relX, relY] = m.multiplyPoint ([this.x, this.y]);
			}
			context.save ();
			context.translate (relX, relY);
			context.rotate (this.angle);
			context.translate (-this.anchorX, -this.anchorY);
			context.drawImage (this.image, 0, 0);
			
			context.restore ();
			*/
			
			return true;
		} else {
			return false;
		}
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
	
	matrix () {
		let m = new Matrix3();
		m.rotate (this.angle);
		m.translate (this.x, this.y);
		if (this.parent) {
			m.multiply(this.parent.matrix ());
		}
		return m;
	}
}

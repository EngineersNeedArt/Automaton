// automaton.js

import { Sprite } from './sprite.js';
import { Cam } from './cam.js';
import { Linkage } from './linkage.js';

export class Automaton {
	constructor () {
		this.canvas = null;
		this.context = null;
		this.harlequin = [];
		this.cams = [];
		this.linkages = [];
	}
	
	init (canvasElement) {
		this.canvas = canvasElement;
		this.context = this.canvas.getContext('2d');
		
		const body = new Sprite ('harlequin0/harl0_body.png', 123, 305);
		body.x = 300;
		body.y = 400;
		
		const rightArm = new Sprite ('harlequin0/harl0_arm0.png', 59, 37);
		rightArm.x = -90 + 123;
		rightArm.y = -70 + 305;
		rightArm.parent = body;
		
		const leftArm = new Sprite ('harlequin0/harl0_arm1.png', 64, 34);
		leftArm.x = 90 + 123;
		leftArm.y = -70 + 305;
		leftArm.parent = body;
		
		const leftThigh = new Sprite ('harlequin0/harl0_thigh0.png', 55, 52);
		leftThigh.x = 65 + 123;
		leftThigh.y = 90 + 305;
		leftThigh.parent = body;
		
		const rightThigh = new Sprite ('harlequin0/harl0_thigh1.png', 53, 41);
		rightThigh.x = -65 + 123;
		rightThigh.y = 90 + 305;
		rightThigh.parent = body;
		
		const leftCalf = new Sprite ('harlequin0/harl0_calf0.png', 56, 24);
		leftCalf.x = 0 + 55;
		leftCalf.y = 136 + 52;
		leftCalf.parent = leftThigh;
		
		const rightCalf = new Sprite ('harlequin0/harl0_calf1.png', 106, 29);
		rightCalf.x = 0 + 53;
		rightCalf.y = 136 + 41;
		rightCalf.parent = rightThigh;
		
		this.harlequin.push (leftCalf);
		this.harlequin.push (rightCalf);
		this.harlequin.push (leftThigh);
		this.harlequin.push (rightThigh);
		this.harlequin.push (leftArm);
		this.harlequin.push (rightArm);
		this.harlequin.push (body);

		const bodyCam = new Cam (0, 10.0, 0, 10.0);
		const bodyTwistCam = new Cam (0, 2.0, 0, 2.0);
		const leftArmCam = new Cam (2.0, 0.25, 0.0, 0.25);
		const rightArmCam = new Cam (2.0, 0.25, 0.0, 0.25);
		rightArmCam.advance (1.25);
		const leftThighCam = new Cam (0, 1.0, 0.0, 1.0);		// 0, -0.5
		const leftCalfCam = new Cam (0, 1.0, 0.0, 1.0);
		const rightThighCam = new Cam (0, 1.0, 0.0, 1.0);		// 0.5, 0
		const rightCalfCam = new Cam (0, 1.0, 0.0, 1.0);
		
		this.cams.push (bodyCam);
		this.cams.push (bodyTwistCam);
		this.cams.push (leftArmCam);
		this.cams.push (rightArmCam);
		this.cams.push (leftThighCam);
		this.cams.push (leftCalfCam);
		this.cams.push (rightThighCam);
		this.cams.push (rightCalfCam);
		
		const bodyLinkage = new Linkage (body, bodyCam, Linkage.Movement.X, 900, 300);
		const bodyTwistLinkage = new Linkage (body, bodyTwistCam, Linkage.Movement.Angle, 0.5, -0.25);
		const leftArmLinkage = new Linkage (leftArm, leftArmCam, Linkage.Movement.Angle, 1.0, 3.3);
		const rightArmLinkage = new Linkage (rightArm, rightArmCam, Linkage.Movement.Angle, -1.0, 3.0);
		const leftThighLinkage = new Linkage (leftThigh, leftThighCam, Linkage.Movement.Angle, -0.5, 0.0);
		const leftCalfLinkage = new Linkage (leftCalf, leftCalfCam, Linkage.Movement.Angle, 1, 0);
		const rightThighLinkage = new Linkage (rightThigh, rightThighCam, Linkage.Movement.Angle, -0.5, 0.5);
		const rightCalfLinkage = new Linkage (rightCalf, rightCalfCam, Linkage.Movement.Angle, -1, 0);
		
		this.linkages.push (bodyLinkage);
		this.linkages.push (bodyTwistLinkage);
		this.linkages.push (leftArmLinkage);
		this.linkages.push (rightArmLinkage);
		this.linkages.push (leftThighLinkage);
		this.linkages.push (leftCalfLinkage);
		this.linkages.push (rightThighLinkage);
		this.linkages.push (rightCalfLinkage);
	}
	
	begin () {
		requestAnimationFrame(this.animationLoop);
	}
	
	animationLoop = (currentTime) => {
		// Advance cams.
		for (let i = 0; i < this.cams.length; i++) {
			this.cams[i].advance (1.0 / 60.0);
		}
		
		// Update linkages.
		for (let i = 0; i < this.linkages.length; i++) {
			this.linkages[i].update ();
		}
		
		// Draw sprites.
		this.context.fillStyle = 'black';
		this.context.fillRect (0, 0, this.canvas.width, this.canvas.height);
		
		this.context.save();
		this.context.scale(0.5, 0.5);
		
		for (let i = 0; i < this.harlequin.length; i++) {
			this.harlequin[i].draw (this.context);
		}
		
		this.context.restore();
		
		// Kick off another animation loop.
		requestAnimationFrame (this.animationLoop);
	}
}
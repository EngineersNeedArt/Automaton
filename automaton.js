// automaton.js

import { Model } from './model.js';

export class Automaton {
	constructor () {
		this.model = null;
	}
	
	init (canvasElement) {
		this.canvas = canvasElement;
		this.model = new Model ('harlequin0/harlequin.json', 300, 400);
	}
	
	begin () {
		requestAnimationFrame(this.animationLoop);
	}
	
	animationLoop = (currentTime) => {
		this.model.advance (1.0 / 60.0);
		
		// Draw sprites.
		const ctx = this.canvas.getContext('2d');
		ctx.fillStyle = 'black';
		ctx.fillRect (0, 0, this.canvas.width, this.canvas.height);
		
		ctx.save();
		ctx.scale(0.5, 0.5);
		this.model.draw (ctx);
		ctx.restore();
		
		// Kick off another animation loop.
		requestAnimationFrame (this.animationLoop);
	}
}
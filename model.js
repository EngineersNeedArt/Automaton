// model.js


import { Cam } from './cam.js';
import { Linkage } from './linkage.js';
import { Sprite } from './sprite.js';


export class Model {
	
	_spriteWithID (identifier) {
		let sprite = null;
		for (let modelSprites of this.sprites) {
			if (modelSprites.identifier == identifier) {
				sprite = modelSprites;
				break;
			}
		}
		return sprite;
	}
	
	_camWithID (identifier) {
		let cam = null;
		for (let modelCams of this.cams) {
			if (modelCams.identifier == identifier) {
				cam = modelCams;
				break;
			}
		}
		return cam;
	}
	
	_initModel (jsonData) {
		const jsonSprites = jsonData.sprites;		
		if (jsonSprites) {
			const basePath = this.modelPath.substring(0, this.modelPath.lastIndexOf('/') + 1);
			for (let element of jsonSprites) {
				const sprite = new Sprite (basePath + '/' + element.path, element.anchorX, element.anchorY);
				sprite.x = element.x;
				sprite.y = element.y;
				sprite.identifier = element.id;
				const parent = element.parent;
				if (parent) {
					sprite.parent = this._spriteWithID (parent);
				}
				this.sprites.push (sprite);
			}
		}
		
		this.sprites[0].x = this.startX;
		this.sprites[0].y = this.startY;
		
		const jsonCams = jsonData.cams;
		if (jsonCams) {
			for (let element of jsonCams) {
				const cam = new Cam (element.off, element.rise, element.hold, element.fall);
				cam.identifier = element.id;
				const advance = element.advance;
				if (advance) {
					cam.advance(advance);
				}
				this.cams.push (cam);
			}
		}
		
		const jsonLinkages = jsonData.linkages;
		if (jsonLinkages) {
			for (let element of jsonLinkages) {
				const linkage = new Linkage (this._spriteWithID(element.sprite), this._camWithID(element.cam), element.movement, element.scale, element.offset);
				this.linkages.push (linkage);
			}
		}
		
		this.loaded = true;
	}
	
	_loadJSON (filePath, operation) {
		fetch (filePath)
		.then (response => response.json())
		.then (data => {
			operation.call(this, data);
		})
		.catch(error => console.error(error));
	}
	
	constructor(modelPath, x, y) {
		this.loaded = false;
		this.modelPath = modelPath;
		this.startX = x;
		this.startY = y;
		this.sprites = [];
		this.cams = [];
		this.linkages = [];
		
		this._loadJSON (modelPath, this._initModel);
	}
	
	advance (timeInterval) {	
		// Advance cams.
		for (let i = 0; i < this.cams.length; i++) {
			this.cams[i].advance (timeInterval);
		}
		
		// Update linkages.
		for (let i = 0; i < this.linkages.length; i++) {
			this.linkages[i].update ();
		}
	}
	
	draw (ctx) {
		const count = this.sprites.length;
		for (let i = 0; i < count; i++) {
			this.sprites[count - i - 1].draw (ctx);
		}
	}
}

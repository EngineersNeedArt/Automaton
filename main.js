// main.js

import { Automaton } from './automaton.js';

const automaton = new Automaton();
const canvasElement = document.getElementById('myCanvas');
resize();
automaton.init(canvasElement);
automaton.begin();

function resize() {
	canvasElement.width = window.innerWidth;
	canvasElement.height = window.innerHeight - 160;
}

function windowDidResize() {
	resize();
	automaton.draw();
}

// Resize the canvas when the window is resized
window.addEventListener('resize', windowDidResize);

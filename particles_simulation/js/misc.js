const canvas_H = 800 //Math.min(document.body.clientHeight, document.body.clientWidth);
const MAX_PARTICLES = 60;
const PARTICLE_MASS = 8;

const MAX_SPEED = 50;

const Interval_frame = 60;


let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");



export { canvas_H, canvas, ctx, MAX_PARTICLES, Interval_frame, PARTICLE_MASS, MAX_SPEED};
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const HEIGHT = 640;
const WIDTH = 800;
const HALF_HEIGHT = HEIGHT/2;
const HALF_WIDTH = WIDTH/2;

// PROJECTION
const APSECT_RATIO = HEIGHT/WIDTH;
const FOV = 68 * Math.PI / 180
const HALF_FOV = FOV/2;
const F = 1 / Math.tan(HALF_FOV);

const Z_FAR = 200; // Max deep
const Z_NEAR = 1; // Min deep
const LAMBDA = Z_FAR / (Z_FAR - Z_NEAR) // scale factor
// *********

canvas.height = HEIGHT;
canvas.width = WIDTH;
canvas.style.backgroundColor = "black";

export { ctx, HALF_HEIGHT, HALF_WIDTH, HEIGHT, WIDTH, APSECT_RATIO, F, LAMBDA, Z_NEAR }
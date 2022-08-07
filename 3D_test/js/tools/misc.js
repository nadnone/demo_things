let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const HEIGHT = 640;
const WIDTH = 800;
const HALF_HEIGHT = HEIGHT/2;
const HALF_WIDTH = WIDTH/2;

canvas.height = HEIGHT;
canvas.width = WIDTH;
canvas.style.backgroundColor = "black";

const FOV = 68 * Math.PI / 180;
const HALF_FOV = (FOV / 2);

const CAMERA_Z = 500;


const ASPECT_RATIO = HEIGHT/WIDTH;
const SCALE = Math.tan( HALF_FOV ) / 2;

const SCALE_MIN = SCALE / Math.min(1, ASPECT_RATIO);
const SCALE_MAX = SCALE * Math.max(1, ASPECT_RATIO);

export { ctx, FOV, HALF_FOV, SCALE, CAMERA_Z, ASPECT_RATIO, HALF_HEIGHT, HALF_WIDTH, SCALE_MAX, SCALE_MIN, HEIGHT, WIDTH }
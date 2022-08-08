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

const CAMERA_Z = 60;

export { ctx, FOV, HALF_FOV, CAMERA_Z, HALF_HEIGHT, HALF_WIDTH, HEIGHT, WIDTH }
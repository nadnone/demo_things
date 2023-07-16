let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const HEIGHT = 640;
const WIDTH = 800;
const HALF_HEIGHT = HEIGHT/2;
const HALF_WIDTH = WIDTH/2;

canvas.height = HEIGHT;
canvas.width = WIDTH;
canvas.style.backgroundColor = "black";

export { ctx, HALF_HEIGHT, HALF_WIDTH, HEIGHT, WIDTH}
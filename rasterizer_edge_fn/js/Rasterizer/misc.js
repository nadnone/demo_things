let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const N = 800;
canvas.height = N;
canvas.width = N;
canvas.style.backgroundColor = "black";


export { ctx, N }
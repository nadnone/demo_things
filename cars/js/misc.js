const WORLD = {"h": 10000, "w": 10000};
const EYE =  {
    "h": 800, "w": 800,
    "c_x": 400, "c_y": 400
};


let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");



export { WORLD, EYE, canvas, ctx }
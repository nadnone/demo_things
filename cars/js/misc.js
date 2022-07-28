const WORLD = {"h": 360, "w": 360};
const EYE =  {
    "h": 900, "w": 900,
    "c_x": 450, "c_y": 450
};


let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");



export { WORLD, EYE, canvas, ctx }
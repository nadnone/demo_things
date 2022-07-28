import { EYE, canvas, ctx, WORLD } from "./misc.js";
import Car from "./Car.js";
import Input_Event from "../Input_Event.js";


let player = null;
let input = null;

// à changer
let img = document.createElement("img");
img.src = "./assets/map.jpg";

function init()
{
    // canvas
    canvas.height = EYE.h;
    canvas.width = EYE.w;
    canvas.style.backgroundColor = "black";


    // player
    player = new Car();

    // Input Event
    input = new Input_Event();
}

function drawMap(data)
{
 

    ctx.beginPath();
    ctx.drawImage(img, data.pos.x, data.pos.y, WORLD.w, WORLD.h);
    ctx.closePath();

}


let t = 0;

function loop()
{

    let t0 = performance.now();


    // refresh
    ctx.clearRect(0, 0, EYE.w, EYE.h);

    // map
    drawMap(player.getData());

    // player

    player.drive_control(input);

    player.draw(ctx);

    let t1 = performance.now();
    t = t1 - t0;
}



init();

setInterval(loop, 60);
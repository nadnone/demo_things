import { canvas, canvas_H, ctx, Interval_frame } from "./misc.js";
import World from './World.js';




canvas.height = canvas_H;
canvas.width = canvas_H; 



let myWorld = new World();
myWorld.init();

function loop()
{
    ctx.clearRect(0,0, canvas_H, canvas_H);


    myWorld.animate(ctx);

}


//loop();
setInterval(loop, Interval_frame);

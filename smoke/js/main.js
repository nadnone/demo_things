import { dissipation, smoke, torch } from "./smoke.js";
import { N, canvas, ctx } from "./misc.js"



canvas.height = N;
canvas.width = N;
canvas.style = "background-color: black;";


let t = 0;

function loop()
{
    let t0 = Date.now() / 100;

    ctx.clearRect(0, 0, N, N);

    torch();

    smoke();
    dissipation();

    let t1 = Date.now() / 100;
    t = t0 - t1;
}


setInterval(loop, 10);
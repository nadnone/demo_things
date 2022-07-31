import { ctx } from "./misc.js";

function drawPixel(p, c, s)
{
    //ctx.beginPath();
    //ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
    //ctx.fillRect(p.x, p.y, s, s);
    //ctx.closePath();



    setInterval(() => {
        ctx.beginPath();
        ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
        ctx.fillRect(p.x, p.y, s, s);
        ctx.closePath();
    }, 10);

}

export { drawPixel };
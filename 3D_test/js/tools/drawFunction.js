import { ctx, HALF_HEIGHT, HALF_WIDTH } from "./constants.js";

export default function drawFunction(px, py, colors)
{


        ctx.beginPath();
        ctx.fillStyle = colors
        ctx.fillRect(px, py, 1, 1);
        ctx.closePath();
}
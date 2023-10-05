import { ctx, HALF_HEIGHT, HALF_WIDTH } from "./constants.js";

export default async function drawFunction(m_py, m_px, color)
{
        const px = m_px + HALF_WIDTH;
        const py = m_py + HALF_HEIGHT;

        ctx.beginPath();
        ctx.fillStyle = color
        ctx.fillRect(px, py, 1, 1);
        ctx.closePath();
}

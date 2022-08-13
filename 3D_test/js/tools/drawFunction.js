import { ctx, HALF_HEIGHT, HALF_WIDTH } from "./constants.js";

export default function drawFunction(matrice)
{

    for (let i = 0; i < matrice.length; i++) {
        
        const px = matrice[i][0] + HALF_WIDTH;
        const py = matrice[i][1] + HALF_HEIGHT;
        const colors = matrice[i][3]


        ctx.beginPath();
        ctx.fillStyle = colors
        ctx.fillRect(px, py, 1, 1);
        ctx.closePath();
        
    }
}
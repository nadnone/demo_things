import { ctx } from "./constants.js";

export default function drawFunction(matrice)
{

    for (let i = 0; i < matrice.length; i++) {
        
        const px = matrice[i][0];
        const py = matrice[i][1];
        const colors = matrice[i][3]


        ctx.beginPath();
        ctx.fillStyle = colors
        ctx.fillRect(px, py, 1, 1);
        ctx.closePath();
        
    }
}
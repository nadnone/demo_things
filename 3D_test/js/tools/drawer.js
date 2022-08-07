import { ctx } from "./misc.js";

export default function drawer(matrice, colors)
{


    for (let i = 0; i < matrice.length; i+=3) {
        
        ctx.beginPath();
        ctx.fillStyle = colors[i/3]

        for (let x = 0; x < 3; x++) {

            ctx.lineTo(matrice[i+x][0], matrice[i+x][1]);
        }


        ctx.fill();
        ctx.closePath();


    }

  
}
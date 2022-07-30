import { drawPixel } from "./graphics.js";

export default function bresengan_aglorithm(objet)
{
    let mx = [];
    let my = [];
    let a = 0, b = 0;
 

    for (let k = 0; k < objet.length - 1; k++) {


        if (objet[k].x < objet[k+1].x)  a = 0, b = 1;
        else a = 1, b = 0;
   
        for (let x = objet[k+a].x; x < objet[k+b].x; x++) {

            let y = bresenham_calculus(k, x, objet);
            mx.push(x);
            my.push(y);

            drawPixel( {"x": x, "y": y}, {"r": 0, "g": 125, "b": 0}, 6);
        
        }
        
      
        let y = objet[k+b].y;

        for (let x = objet[k+a].x; x < objet[k+b].x; x++) {

            mx.push(x);
            my.push(y);
            drawPixel( {"x": x, "y": y}, {"r": 0, "g": 125, "b": 0}, 6);

        }

        let x = objet[k+a].x;
        for (let y = objet[k+a].y; y < objet[k+b].y; y++) {

            mx.push(x);
            my.push(y);
            drawPixel( {"x": x, "y": y}, {"r": 0, "g": 125, "b": 0}, 6);
        }
       



    }



    return [mx, my];

}
function bresenham_calculus(k, i, objet)
{
    let x = (objet[k+1].x - objet[k].x) / (objet[k+1].y - objet[k].y);
    x *= (i - objet[k].y);
    x += objet[k].x;
    return x;
}
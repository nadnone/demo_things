import { drawPixel } from "./graphics.js";

export default function bresengan_aglorithm(objet)
{
    let m = [];

    for (let k = 0; k < objet.length - 1; k++) {

        m = condition_loop(m, objet, k);
    }
    
    m = condition_loop(m, objet, "last");

    return m;

}
function bresenham_calculus(k, i, objet, a, b)
{
    let x = (objet[k+b].x - objet[k+a].x) / (objet[k+b].y - objet[k+a].y);
    x *= (i - objet[k+a].y);
    x += objet[k+a].x;
    return x;
}

function condition_loop(m, objet, k)
{
    let a = 0, b = 0;

    if (k === "last" && objet[0].x < objet[ objet.length - 1].x)
    {
        a = 0; b = objet.length - 1; k = 0;
    }
    else if (k === "last" && objet[0].x > objet[ objet.length - 1].x) 
    {
        a = objet.length -1; b = 0; k = 0;
    }
    else if (objet[k].x < objet[k+1].x && k !== "last")
    {
        a = 0, b = 1; 
    }  
    else 
    {
        a = 1, b = 0;
    }

    

    for (let y = objet[k+a].y; y < objet[k+b].y; y++) {

        let x = bresenham_calculus(k, y, objet, a, b);
        m.push({"x": x, "y": y})

        drawPixel( {"x": x, "y": y}, {"r": 0, "g": 255, "b": 0}, 6);
    
    }
   
    // les Y

    if (objet[k+a].y === objet[k+b].y )
    {
        let y = objet[k+b].y;
        for (let x = objet[k+a].x; x < objet[k+b].x; x++) {
    
            m.push({"x": x, "y": y})

            drawPixel( {"x": x, "y": y}, {"r": 0, "g": 100, "b": 0}, 6);
    
        }
    }
    // les X

    
    if (k === "last" && objet[0].y < objet[ objet.length - 1].y)
    {
        a = 0; b = objet.length - 1; k = 0;
    }
    else if (k === "last" && objet[0].y > objet[ objet.length - 1].y) 
    {
        a = objet.length -1; b = 0; k = 0;
    }
    else if (objet[k].y < objet[k+1].y && k !== "last")
    {
        a = 0, b = 1; 
    }  
    else 
    {
        a = 1, b = 0;
    }


    if (objet[k+a].x === objet[k+b].x)
    {
        let x = objet[k+b].x;
        for (let y = objet[k+a].y; y < objet[k+b].y; y++) {
    
            m.push({"x": x, "y": y})

            drawPixel( {"x": x, "y": y}, {"r": 100, "g": 0, "b": 0}, 6);
    
        }
    }
   
    return m;
}
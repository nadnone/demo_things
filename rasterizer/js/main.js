let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const N = 800;
canvas.height = N;
canvas.width = N;
canvas.style.backgroundColor = "black";


let objet = [
    {"x": 100, "y": 100},
    {"x": 600, "y": 100},
    {"x": 600, "y": 600}


];

let ordre = [
    0, 1,
    1, 2,
    2, 0
    
];



function bubble_sort_algo(mx, my)
{
    let tx = [], ty = [];

    for (let j = 0; j < mx.length; j++) {


        const x0 = mx[j];   
        const x1 = mx[j+1];
        
        const y0 = my[j];   
        const y1 = my[j+1];

        if (x1 > x0)
        {
            // swap
            ty[j] = y1;
            ty[j+1] = y0;

            tx[j] = x1;
            tx[j+1] = x0;
        }

    }
    return [tx, ty];
}

function scanline_algo(mx, my)
{

    let [tx, ty] = bubble_sort_algo(mx, my);

    let x0 = tx[0];

    for (let j = 0; j < ty.length; j++) {
       
        const y = ty[j];

        for (let k = 0; k < tx.length; k++) {
      
            const x1 = tx[k];

            if (x0 < x1)
            {
                for (let i = x0; i < x1; i++) {
                    
                    drawPixel( {"x": i, "y": y}, {"r": 255, "g": 125, "b": 0}, 6);
                }
    
                x0 = x1;
            }

        }

        x0 = tx[j];

       
    }


}

function bresenham_calculus(k, i)
{
    let x = (objet[ordre[k+1]].x - objet[ordre[k]].x) / (objet[ordre[k+1]].y - objet[ordre[k]].y);
    x *= (i - objet[ordre[k]].y);
    x += objet[ordre[k]].x;
    return x;
}

function line_calculus(objet, k, a, b)
{
    let mx = [];
    let my = [];


    if (objet[ordre[k+a]].x === objet[ordre[k+b]].x)
    {
        let x = objet[ordre[k+b]].x;

        if (objet[ordre[k]].y < objet[ordre[k+1]].y)  a = 0, b = 1;
        else a = 1, b = 0;
   

        for (let y = objet[ordre[k+a]].y; y < objet[ordre[k+b]].y; y++) {
            
            mx.push(x);
            my.push(y);

        }
    }
    else if (objet[ordre[k+a]].y === objet[ordre[k+b]].y)
    {
        let y = objet[ordre[k+b]].y;

        if (objet[ordre[k]].x < objet[ordre[k+1]].x)  a = 0, b = 1;
        else a = 1, b = 0;
   

        for (let x = objet[ordre[k+a]].x; x < objet[ordre[k+b]].x; x++) {

            mx.push(x);
            my.push(y);

        }
    }
    else
    {
        for (let x = objet[ordre[k+a]].x; x < objet[ordre[k+b]].x; x++) {

            let y = bresenham_calculus(k, x);
            mx.push(x);
            my.push(y);
        
        }
    }

    return [mx, my];

}

function bresengan_aglorithm(objet)
{
    let mx = [];
    let my = [];

    for (let k = 0; k < ordre.length; k+=2) {

        let [a, b] = [0, 0];

        if (objet[ordre[k]].x < objet[ordre[k+1]].x)  a = 0, b = 1;
        else a = 1, b = 0;
   

        [ox, oy] = line_calculus(objet, k, a, b);

        mx = mx.concat(ox);
        my = my.concat(oy);

    }
    
    return [mx, my];
    

}



                

function drawPixel(p, c, s)
{
    ctx.beginPath();
    ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
    ctx.fillRect(p.x, p.y, s, s);
    ctx.closePath();
}





let t = 0;
function main()
{
    let [mx, my] = bresengan_aglorithm(objet);

    scanline_algo(mx, my);
}

main();
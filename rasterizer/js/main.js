let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const N = 800;
canvas.height = N;
canvas.width = N;
canvas.style.backgroundColor = "black";


let objet = [
    {"x": 100, "y": 100},
    {"x": 500, "y": 500},
];

let ordre = [
    0, 1,
    1, 0,
];


function bresenham_calculus(k, i)
{
        let x = (objet[ordre[k+1]].x - objet[ordre[k]].x) / (objet[ordre[k+1]].y - objet[ordre[k]].y);
        x *= (i - objet[ordre[k]].y);
        x += objet[ordre[k]].x;
        return x;
}

function bubble_sort_algo(table, table1)
{
    let t1 = [], t0 = [];

    for (let j = 0; j < table.length; j++) {
        const el00 = table[j];   
        const el01 = table[j+1];
        
        const el10 = table1[j];   
        const el11 = table1[j+1];

        if (el01 > el00)
        {
            // swap
            t0[j] = el01;
            t0[j+1] = el00;

            t1[j] = el11;
            t1[j+1] = el10;
        }

    }

    
    return [t0, t1];
}

function scanline_algo(mx, my)
{

    let [tx, ty] = bubble_sort_algo(mx, my);

    let cursor_y = ty[1];
    let cursor_x = tx[1];

    for (let i = 0; i < ty.length; i++) {
        
        const y = ty[i];
        const x1 = tx[i];

        if (y !== cursor_y)
        {

            for (let x = cursor_x; x < x1; x++) {

                drawPixel( {"x": x, "y": y}, {"r": 255, "g": 125, "b": 0}, 6);
                
            } 

            cursor_y = y;
            
        }
        else
        {
            cursor_x = x1;
        }



        
    }
        



}

function bresengan_aglorithm(objet)
{
    let mx = [];
    let my = [];

    for (let k = 0; k < ordre.length; k+=2) {

        let condition = objet[ordre[k]].x < objet[ordre[k+1]].x || objet[ordre[k]].y < objet[ordre[k+1]].y;

        let [a, b] = [0, 0];

        if (condition)  a = 0, b = 1;
        else a = 1, b = 0;
   

        for (let x = objet[ordre[k+a]].x; x < objet[ordre[k+b]].x; x++) {

            let y = bresenham_calculus(k, x);
            mx.push(x);
            my.push(y);

        }


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
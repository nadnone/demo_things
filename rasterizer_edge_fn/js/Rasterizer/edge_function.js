import { ctx } from './misc.js';

export default function edge_function_method(m) {


    let min_x = Infinity;
    let min_y = Infinity;

    let max_x = -Infinity;
    let max_y = -Infinity;

        
    const a = abs(m[0])
    const b = abs(m[1])
    const c = abs(m[2])

    min_x = a.x < b.x ? a.x : b.x;
    min_x = min_x < c.x ? min_x : c.x;

    min_y = a.y < b.y ? a.y : b.y;
    min_y = min_y < c.y ? min_y : c.y;

    max_x = a.x > b.x ? a.x : b.x;
    max_x = max_x > c.x ? max_x : c.x;

    max_y = a.y > b.y ? a.y : b.y;
    max_y = max_y > c.y ? max_y : c.y;


    for (let px = min_x; px <= max_x; px++) {

        for (let py = min_y; py <= max_y; py++) {

            let e0 = edge_fn(px, py, a, b);
            let e1 = edge_fn(px, py, b, c);
            let e2 = edge_fn(px, py, c, a);
            

            if ((e0 && e1 && e2) <= 0) 
            {
                ctx.beginPath();
                ctx.fillStyle = "#fff"
                ctx.fillRect(px, py, 1, 1);
                ctx.closePath();
            }

        }
        

    }


   


}


function abs(a) {
    
    return {"x": Math.abs(a.x), "y": Math.abs(a.y)};
}

function edge_fn(px, py, a, b)
{
   return (px - a.x) * (b.y - a.y) - (py - a.y) * (b.x - a.x);
    
}
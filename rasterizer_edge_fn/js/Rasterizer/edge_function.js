import { ctx } from './misc.js';

export default function edge_function_method(m) {


    let min_x = Infinity;
    let min_y = Infinity;

    let max_x = -Infinity;
    let max_y = -Infinity;

        
    const V0 = m[0]
    const V1 = m[1]
    const V2 = m[2]

    min_x = V0.x < V1.x ? V0.x : V1.x;
    min_x = min_x < V2.x ? min_x : V2.x;

    min_y = V0.y < V1.y ? V0.y : V1.y;
    min_y = min_y < V2.y ? min_y : V2.y;

    max_x = V0.x > V1.x ? V0.x : V1.x;
    max_x = max_x > V2.x ? max_x : V2.x;

    max_y = V0.y > V1.y ? V0.y : V1.y;
    max_y = max_y > V2.y ? max_y : V2.y;


    for (let px = min_x; px <= max_x; px++) {

        for (let py = min_y; py <= max_y; py++) {

            let p = {"x": px, "y": py};
            
            let inside_triangle = true;

            inside_triangle &= edge_fn(p, V0, V1);
            inside_triangle &= edge_fn(p, V1, V2);
            inside_triangle &= edge_fn(p, V2, V0);


            if (inside_triangle)
            {

                ctx.beginPath();
                ctx.fillStyle = "#fff"
                ctx.fillRect(px, py, 1, 1);
                ctx.closePath();

            }
          
            
        }
        

    }


   


}
function edge_fn(p, a, b)
{

    let deltaP = soustraction(p, a);
    let deltaBA = soustraction(b, a);
    let cross = cross_product(deltaBA, deltaP);

    return cross >= 0
}

function cross_product(a, b)
{
    return (a.x * b.y) - (a.y * b.x);
}


function soustraction(a,b)
{
    let v = [];

    v.x = a.x - b.x;
    v.y = a.y - b.y;

    return v;
}
import { ctx, HEIGHT, WIDTH } from './misc.js';
import { soustraction, cross_product, norme, dot, scalar_product, multiply, addition } from './vectors_maths.js';


export default function edge_function_method(m, color, depth) 
{

    for (let i = 0; i < m.length; i+=3) {
       

        const V0 = m[i + 0]
        const V1 = m[i + 1]
        const V2 = m[i + 2]
        

        let min_x = Infinity;
        let min_y = Infinity;
    
        let max_x = -Infinity;
        let max_y = -Infinity;

    
        // to check less pixels
        min_x = V0[0] < V1[0] ? V0[0] : V1[0];
        min_x = min_x < V2[0] ? min_x : V2[0];
    
        min_y = V0[1] < V1[1] ? V0[1] : V1[1];
        min_y = min_y < V2[1] ? min_y : V2[1];
    
        max_x = V0[0] > V1[0] ? V0[0] : V1[0];
        max_x = max_x > V2[0] ? max_x : V2[0];
    
        max_y = V0[1] > V1[1] ? V0[1] : V1[1];
        max_y = max_y > V2[1] ? max_y : V2[1];
    
    
        for (let px = min_x; px <= max_x; px++) 
        {
    
            for (let py = min_y; py <= max_y; py++) 
            {
    
                const p = [px, py];
    
                let inside_triangle = true;

                inside_triangle &= edge_fn(p, V0, V1);
                inside_triangle &= edge_fn(p, V1, V2);
                inside_triangle &= edge_fn(p, V2, V0);
                

                // Depth buffer (à Revoir)
                const D = Math.sqrt( px**2 + py**2 );
                const z = (-V0[0] - V1[1] - D) / V2[2];
                const depth_checker = Math.floor(z) < depth[Math.floor(px) + Math.floor(py) * WIDTH] && V2[2] !== 0;


                if (inside_triangle && depth_checker)
                {

                    depth[Math.floor(px) + Math.floor(py) * WIDTH] = Math.floor(z);


                    ctx.beginPath();
                    ctx.fillStyle = color[i/6]
                    ctx.fillRect(px, py, 1, 1);
                    ctx.closePath();

                }
    
                    
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
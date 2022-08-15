import { ctx } from './constants.js';
import { soustraction, determinant_3x3, norme, dot, cross_product, angle_vector } from './vectors_maths.js';

export default function graphics_pipeline(m, colors) 
{

    let m_out = [];

    for (let i = 0; i < m.length; i+=3) {
       

        let V0 = m[i + 0]
        let V1 = m[i + 1]
        let V2 = m[i + 2]
        

        /*
            backface detection
            https://youtu.be/ShTiQGxiZRk

            la normale de la face du triangle * le vecteur de vue de la caméra (dans mon cas, V0)
        */
        const backtest = dot( cross_product( soustraction(V1, V0), soustraction(V2, V0) ), V0 );
        if (backtest > 0 ) continue;

    

        // to check less pixels
        const min_x = Math.min(V0[0], V1[0], V2[2]);
        const min_y = Math.min(V0[1], V1[1], V2[1]);
 
        const max_x = Math.max(V0[0], V1[0], V2[0]);
        const max_y = Math.max(V0[1], V1[1], V2[1]);
    
        //const volum_total = determinant_3x3([V0, V1, V2])
    
        for (let px = min_x; px <= max_x; px++) 
        {
    
            for (let py = min_y; py <= max_y; py++) 
            {
    
                let p = [px, py, 0]
 
   

                /*  
                    Barycentre of 3 points

                    1. aMA + bMB + cMC = (a + b + c)MG
                    2. zG = (AzA + bzB + czC) / (a + b + c)

                const a = determinant_3x3([p, V0, V1]) - volum_total
                const b = determinant_3x3([p, V1, V2]) - volum_total 
                const c = determinant_3x3([p, V2, V0]) - volum_total

                const z = ((a * V0[2]) + (b * V1[2]) + (c * V2[2])) / (a + b + c) 
                */

                
                
                /*
                    edge detection pour savoir si le pixel est dans le triangle 
                */
                let inside_triangle = true;

    


                inside_triangle &= edge_fn(p, V0, V1);
                inside_triangle &= edge_fn(p, V1, V2);
                inside_triangle &= edge_fn(p, V2, V0);


                if (inside_triangle)
                {
                    m_out.push([px, py, 0, colors[i]]);
                }
    
                    
            }
        }


    }

    return m_out;
}

function edge_fn(p, a, b)
{
    // A REVOIR

    const deltaBA = soustraction(b, a)
    const deltaPA = soustraction(p, a)

    const N = cross_product(deltaBA, deltaPA)[2];

    return N > 0;
}
import { soustraction, determinant_3x3, } from './vectors_maths.js';

export default function edge_function_method(m, colors) 
{

    let m_out = [];

    for (let i = 0; i < m.length; i+=3) {
       

        const V0 = m[i + 0] 
        const V1 = m[i + 1]
        const V2 = m[i + 2]
        

        // to check less pixels
        const min_x = Math.min(V0[0], V1[0], V2[2]);
        const min_y = Math.min(V0[1], V1[1], V2[1]);
 
        const max_x = Math.max(V0[0], V1[0], V2[0]);
        const max_y = Math.max(V0[1], V1[1], V2[1]);
    
        const volum_total = determinant_3x3([V0,V1,V2])
    
        for (let px = min_x; px <= max_x; px++) 
        {
    
            for (let py = min_y; py <= max_y; py++) 
            {
    
                let p = [px, py, 0]
 
                const a = determinant_3x3([p, V0, V1])/volum_total
                const b = determinant_3x3([p, V1, V2])/volum_total 
                const c = determinant_3x3([p, V2, V0])/volum_total

                /*  
                    Barycentre of 3 points

                    1. aMA + bMB + cMC = (a + b + c)MG
                    2. zG = (AzA + bzB + czC) / (a + b + c)

                */

                let z = ((a * V0[2]) + (b * V1[2]) + (c * V2[2])) / (a + b + c) 

                
                p = [px, py, z];

    
                let inside_triangle = true;

                inside_triangle &= edge_fn(p, V0, V1);
                inside_triangle &= edge_fn(p, V1, V2);
                inside_triangle &= edge_fn(p, V2, V0);


                if (inside_triangle)
                {
                    m_out.push([px, py, z, colors[Math.floor(i/6)]]);
                }
    
                    
            }
        }


    }

    return m_out;
}

function edge_fn(p, a, b)
{
    /*
        https://youtu.be/ShTiQGxiZRk
        https://en.wikipedia.org/wiki/Back-face_culling
    */


    const deltaBA = soustraction(b, a)
    const deltaPA = soustraction(p, a)

    const N = (deltaPA[0] * deltaBA[1]) - (deltaPA[1] * deltaBA[0])


    return N < 0
}
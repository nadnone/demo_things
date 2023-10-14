import drawFunction from "./drawFunction.js";
import { addition, mult_scalair, normaliser, norme, produit_scalair, produit_vectoriel, soustraction } from "./vectors_maths.js";

export default async function graphics_pipeline(m, colors) 
{

    let m_out = [];

    let zbuffer = -Infinity;

    for (let i = 0; i < m.length; i += 3) {
    
        const V0 = m[i + 0]
        const V1 = m[i + 1]
        const V2 = m[i + 2]
    
        

        // to check less pixels
        const min_x = Math.min(V0[0], V1[0], V2[0]);
        const min_y = Math.min(V0[1], V1[1], V2[1]);

        const max_x = Math.max(V0[0], V1[0], V2[0]);
        const max_y = Math.max(V0[1], V1[1], V2[1]);

        const min_z = Math.min(V0[2], V1[2], V2[2]);
        const max_z = Math.max(V0[2], V1[2], V2[2]);



        // profondeur du barycentre du triangle
        const barycentre_z = (V0[2] + V1[2] + V2[2]) / (norme(V0) + norme(V1) + norme(V2))

        /*
        if (barycentre_z < 0)
        {
            //continue;
        }
        */

        for (let px = min_x; px <= max_x; px++) 
        {
            for (let py = min_y; py <= max_y; py++) 
            {


                // formula:
                // https://en.wikipedia.org/wiki/Barycentric_coordinate_system


                // weights
                let w0 = (V1[1] - V2[1]) * (px - V2[0]) + (V2[0] - V1[0]) * (py - V2[1]);
                w0 /= (V1[1] - V2[1]) * (V0[0] - V1[0]) + (V2[0] - V1[0]) * (V0[1] - V2[1]); // Det. de T

                let w1 = (V2[1] - V0[1]) * (px - V2[0]) + (V0[0] - V2[0]) * (py - V2[1]);
                w1 /= (V1[1] - V2[1]) * (V0[0] - V1[0]) + (V2[0] - V1[0]) * (V0[1] - V2[1]); // Det. de T

                const w2 = 1 - w0 - w1;
                
                const wA = mult_scalair(V0, w0);
                const wB = mult_scalair(V1, w1);
                const wC = mult_scalair(V2, w2);

                const p = addition( addition(wA, wB), wC);
                //const p = [px, py]

                // edge detection pour savoir si le pixel est dans le triangle 
                if (isPointInTriangle([px, py], V0, V1, V2)) //&& p[2] < 0)
                {
                    
                    drawFunction(px, py, colors[i])
                }
                
            }
        }


    }


    return m_out;
}


function isPointInTriangle(p, a, b, c)
{
    // on teste tous les côtés positifs et négatifs
    let check = isInside(c,a, p) > 0
    check &= isInside(a,b, p) > 0
    check &= isInside(b,c, p) > 0

    let check1 = isInside(c,a, p) < 0
    check1 &= isInside(a,b, p) < 0
    check1 &= isInside(b,c, p) < 0

    return check1 | check
}

function isInside(a, b, p)
{

    // Vec_ap cross Vec_bp 
    return (a[0] - p[0]) * (b[1] - p[1]) - (a[1] - p[1]) * (b[0] - p[0])

    // solution ici
    // https://youtu.be/kkucCUlyIUE
    // https://blackpawn.com/texts/pointinpoly/default.html
    // https://fgiesen.wordpress.com/2013/02/08/triangle-rasterization-in-practice/

}
import drawFunction from "./drawFunction.js";
import { produit_scalair, produit_vectoriel, soustraction, normaliser } from "./vectors_maths.js";

export default async function graphics_pipeline(m, colors) 
{

    let m_out = [];

    for (let i = 0; i < m.length; i += 3) {
    
        const V0 = m[i + 0]
        const V1 = m[i + 1]
        const V2 = m[i + 2]
    
        /* backface culling test
            https://hackmd.io/@HueyNemud/rkAa0jYFw

            // TODO A REVOIR
        */ 

        const normal = produit_vectoriel(soustraction(V2, V1), soustraction(V1, V0));
        const cam_vec = [0, 0, 1];
        const backface_check = produit_scalair(cam_vec, normaliser(normal));

        if (backface_check >= 0)
        {
            //continue;
        }

        // to check less pixels
        const min_x = Math.min(V0[0], V1[0], V2[0]);
        const min_y = Math.min(V0[1], V1[1], V2[1]);

        const max_x = Math.max(V0[0], V1[0], V2[0]);
        const max_y = Math.max(V0[1], V1[1], V2[1]);


        for (let px = min_x; px <= max_x; px++) 
        {
    
            for (let py = min_y; py <= max_y; py++) 
            {
    
                const p = [px, py]

                

                // edge detection pour savoir si le pixel est dans le triangle 
                if (isPointInTriangle(p, V0, V1, V2))
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

    return check | check1;
}

function isInside(a, b, p)
{

    return (a[0] - p[0]) * (b[1] - p[1]) - (a[1] - p[1]) * (b[0] - p[0])

    // solution ici
    // https://youtu.be/kkucCUlyIUE
    // https://blackpawn.com/texts/pointinpoly/default.html
    // https://fgiesen.wordpress.com/2013/02/08/triangle-rasterization-in-practice/

}
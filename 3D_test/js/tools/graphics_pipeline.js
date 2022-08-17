import isTriangleInBack from "./backface_test.js";
import { produit_scalair, produit_vectoriel, scalair, soustraction } from "./vectors_maths.js";

export default function graphics_pipeline(m, colors, angle) 
{

    let m_out = [];

    for (let i = 0; i < m.length; i+=3) {
    
        const V0 = m[i + 0]
        const V1 = m[i + 1]
        const V2 = m[i + 2]
        
        /* backface check */
        //let backtest = produit_scalair( produit_vectoriel( soustraction(V1, V0), soustraction(V2, V0) ), scalair(V0, -10) );
        //if (backtest < 0) continue;


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
                if (isPointInTriangle(p, V0, V1, V2)) //&& isTriangleInBack(V0, V1, V2))
                {
                    m_out.push([px, py, V0[2], colors[i]])
                }
            }
        }


    }

    return m_out;
}


function isPointInTriangle(p, a, b, c)
{
    // on teste tous les côtés positif et négatifs

    let check1 = isInside(c,a, p) > 0
    check1 &= isInside(a,b, p) > 0
    check1 &= isInside(b,c, p) > 0

    let check2 = isInside(c,a, p) < 0
    check2 &= isInside(a,b, p) < 0
    check2 &= isInside(b,c, p) < 0


    

    return check1 | check2
}

function isInside(a, b, p)
{

    return (a[0] - p[0]) * (b[1] - p[1]) - (a[1] - p[1]) * (b[0] - p[0])

    // solution ici
    // https://youtu.be/kkucCUlyIUE
    // https://blackpawn.com/texts/pointinpoly/default.html
    // https://fgiesen.wordpress.com/2013/02/08/triangle-rasterization-in-practice/

}
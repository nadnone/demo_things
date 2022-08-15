import { ctx, HALF_HEIGHT, HALF_WIDTH } from './constants.js';
import drawFunction from './drawFunction.js';
import { soustraction, produit_vectoriel, produit_scalair, scalair} from './vectors_maths.js';

export default function graphics_pipeline(m, colors, angle) 
{

    for (let i = 0; i < m.length; i+=3) {
    
        const V0 = m[i + 0]
        const V1 = m[i + 1]
        const V2 = m[i + 2]
        

        // if triangle is behind the projection view
        //if (!IsBehind(V0, V1, V2)) continue


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
                    drawFunction(px + HALF_WIDTH, py + HALF_HEIGHT, colors[i])
                }
            }
        }


    }

}

function IsBehind(a,b,c)
{
    return backface_culling(a,b,c)
}

function backface_culling(a,b,c)
{
    // https://en.wikipedia.org/wiki/Back-face_culling

    // A REVOIR

    let delta_AB = soustraction(b,a)
    let delta_AC = soustraction(c,a)

    const N = produit_vectoriel(delta_AB, delta_AC)

    let view = scalair(a, -1)

    let calc0 = produit_scalair(view, N) >= 0

    return calc0 
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
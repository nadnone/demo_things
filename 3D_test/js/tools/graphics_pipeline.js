import { ctx } from './constants.js';
import { soustraction, determinant_3x3, norme, angle_vector, produit_vectoriel, produit_scalair} from './vectors_maths.js';

export default function graphics_pipeline(m, colors) 
{

    let m_out = [];

    for (let i = 0; i < m.length; i+=3) {
       

        const V0 = m[i + 0]
        const V1 = m[i + 1]
        const V2 = m[i + 2]
        

        /*
            backface detection pour supprimer les faces arrières
            
            https://youtu.be/ShTiQGxiZRk
            la normale de la face du triangle * le vecteur de vue de la caméra (dans mon cas, V0)
        */
        const backtest = produit_scalair( produit_vectoriel( soustraction(V1, V0), soustraction(V2, V0) ), V0 );
        if (backtest > 0 ) continue;
    
        

        // to check less pixels
        const min_x = Math.min(V0[0], V1[0], V2[2]);
        const min_y = Math.min(V0[1], V1[1], V2[1]);
 
        const max_x = Math.max(V0[0], V1[0], V2[0]);
        const max_y = Math.max(V0[1], V1[1], V2[1]);
    
        for (let px = min_x; px <= max_x; px++) 
        {
    
            for (let py = min_y; py <= max_y; py++) 
            {
    
                let p = [px, py, 1]
 
   
                // edge detection pour savoir si le pixel est dans le triangle 
                if (isPointInTriangle(p, V0, V1, V2))
                {

                    m_out.push([px, py, 0, colors[i]]);
                }
                    
            }
        }


    }

    return m_out;
}

function isPointInTriangle(p, a, b, c)
{
    // on teste tous les côtés
    return isInside(b,c, p) && isInside(c,a, p) &&  isInside(a,b, p)
}

function isInside(a, b, c)
{
    // A REVOIR

    // soustraction + produit scalair
    
    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) >= 0

    // solution ici
    // https://blackpawn.com/texts/pointinpoly/default.html
    // https://fgiesen.wordpress.com/2013/02/08/triangle-rasterization-in-practice/

}
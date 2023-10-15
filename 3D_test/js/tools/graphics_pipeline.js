import drawFunction from "./drawFunction.js";
import { angle_vector, produit_vectoriel, soustraction } from "./vectors_maths.js";

export default async function graphics_pipeline(m, colors) 
{

    let m_out = [];

    for (let i = 0; i < m.length; i += 3) {
    
        const V0 = m[i + 0]
        const V1 = m[i + 1]
        const V2 = m[i + 2]
        

        // to check less pixels
        const min_x = Math.min(V0[0], V1[0], V2[0]);
        const min_y = Math.min(V0[1], V1[1], V2[1]);

        const max_x = Math.max(V0[0], V1[0], V2[0]);
        const max_y = Math.max(V0[1], V1[1], V2[1]);



        // Pixel backface culling
        // https://hackmd.io/@HueyNemud/rkAa0jYFw
        const normale = produit_vectoriel(soustraction(V0, V1), soustraction(V0, V2));
        const vec_cam = soustraction([0,0, -400], V0); // position caméra - pixel (from - to)
        const angle = angle_vector(normale, vec_cam); // angle entre la caméra et la sub-face

        // calcul de l'angle pour savoir si la face doit être affiché
        if (angle >= Math.PI/2) continue;

        // couleur de la face
        const indexcolor = parseInt(i / 6);

        for (let px = min_x; px <= max_x; px++) 
        {
            for (let py = min_y; py <= max_y; py++) 
            {

                // edge detection pour savoir si le pixel est dans le triangle 
                if (isPointInTriangle([px, py], V0, V1, V2))
                {
                    drawFunction(px, py, colors[indexcolor])
                }
                
            }
        }


    }


    return m_out;
}


function isPointInTriangle(p, a, b, c)
{
    // on teste tous les côtés négatifs uniquement 
    // [!] (le sens de rotation des vertices est hyper important pour le backface culling)

    let check = isInside(c,a, p) < 0
    check &= isInside(a,b, p) < 0
    check &= isInside(b,c, p) < 0

    return check 
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
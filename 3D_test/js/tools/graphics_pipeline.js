import drawFunction from "./drawFunction.js";

export default async function graphics_pipeline(m, colors) 
{

    let m_out = [];

    for (let i = 0; i < m.length; i += 3) {
    
        // les vertices du triangle i
        const V0 = m[i + 0]
        const V1 = m[i + 1]
        const V2 = m[i + 2]
        

        // to check less pixels
        const min_x = Math.min(V0[0], V1[0], V2[0]);
        const min_y = Math.min(V0[1], V1[1], V2[1]);

        const max_x = Math.max(V0[0], V1[0], V2[0]);
        const max_y = Math.max(V0[1], V1[1], V2[1]);



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

    /*
        Si le produit vectoriel du pixel en chaque coin du triangle est strictement négatif, on l'imprime.
        Dans le cas contraire on ignore l'impression, car il s'agit d'une face arrière.
        Dans le cas ou il n'est pas entièrement négatif ou positif, le pixel est hors du triangle, on l'ignore aussi
        L'ordre des vertices est dit clockwise

    */
    
    let check = isInside(c,a, p) < 0
    check &= isInside(a,b, p) < 0
    check &= isInside(b,c, p) < 0

    return check 
}

function isInside(a, b, p)
{

    /*
        Calcul de du produit vectoriel entre les deux vecteurs AP et BP

        Equivaut à faire:
            let ap = soustraction_2d(a, p);
            let bp = soustraction_2d(b, p);
            return produit_vectoriel_2d(ap,bp)[1]; 
    */

    return (a[0] - p[0]) * (b[1] - p[1]) - (a[1] - p[1]) * (b[0] - p[0])

    // solution ici
    // https://youtu.be/kkucCUlyIUE
    // https://blackpawn.com/texts/pointinpoly/default.html
    // https://fgiesen.wordpress.com/2013/02/08/triangle-rasterization-in-practice/

}
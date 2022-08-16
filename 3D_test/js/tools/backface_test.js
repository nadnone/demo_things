import { normaliser, produit_scalair, produit_vectoriel, scalair, soustraction } from "./vectors_maths.js"

export default function isTriangleInBack(a,b,c)
{
    return backface_culling(a,b,c)
}

function backface_culling(a,b,c)
{
    // https://en.wikipedia.org/wiki/Back-face_culling
    // https://youtu.be/h_Aqol0oTs4

    // A REVOIR

    let delta_AB = soustraction(b,a)
    let delta_AC = soustraction(c,a)

    let n = produit_vectoriel(delta_AB, delta_AC)
    n = normaliser(n)

    let calc = produit_scalair(a, n) > 0

    return calc
}

export default function bresengan_aglorithm(objet)
{
    let m = [];

    for (let k = 0; k < objet.length-1; k++) {

        m = condition_loop(m, objet, k, 1);
    }
    m = condition_loop(m, objet, 0, objet.length - 1);
    

    return m;

}



function bresenham_calculus(k, objet, l, m)
{
    let a = 0;


    
    if (objet[k].x > objet[k+l].x) 
    {
        a = l; l = 0;
    }

    for (let x = objet[k+a].x; x <= objet[k+l].x; x++) {

        let y = (objet[k+l].y - objet[k+a].y) / (objet[k+l].x - objet[k+a].x) ;
            y *= (x - objet[k+a].x);
            y += objet[k+a].y;

            m.push({"x": x, "y": y});
            
    }

    if (objet[k].y > objet[k+l].y) 
    {
        a = l; l = 0;
    }

    

    for (let y = objet[k+a].y; y <= objet[k+l].y; y++) {

        let x = (objet[k+l].x - objet[k+a].x) / (objet[k+l].y - objet[k+a].y);
            x *= (y - objet[k+a].y);
            x += objet[k+a].x;

            m.push({"x": x, "y": y});
            
    }

    return m;
    
}





function condition_loop(m, objet, k, l)
{

    m = bresenham_calculus(k, objet, l, m);


    return m;
}
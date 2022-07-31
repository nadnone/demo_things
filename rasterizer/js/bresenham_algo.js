export default function bresengan_aglorithm(objet)
{
    let m = [];

    for (let k = 0; k < objet.length-1; k++) {

        m = condition_loop(m, objet, k, 1);
    }
    m = condition_loop(m, objet, 0, objet.length - 1);
    

    return m;

}
function calculus_Y(objet, k, m, l)
{
    let [a,b] = [0,0];

    if (objet[k].x < objet[k+l].x)
    {
        a = 0, b = 1; 
    }  
    else 
    {
        a = 1, b = 0;
    }


    if (objet[k+a].y === objet[k+b].y )
    {
        let y = objet[k+b].y;
        for (let x = objet[k+a].x; x < objet[k+b].x; x++) {
    
            m.push({"x": x, "y": y})

        }
    }

    return m;
}


function calculus_X(objet, k, m, l)
{
    let [a,b] = [0,0];
    
    if (objet[k].y < objet[k+l].y)
    {
        a = 0, b = 1; 
    }  
    else 
    {
        a = 1, b = 0;
    }

    if (objet[k+a].x === objet[k+b].x)
    {
        let x = objet[k+b].x;
        for (let y = objet[k+a].y; y < objet[k+b].y; y++) {
    
            m.push({"x": x, "y": y});
        }
    }

    return m;
}



function bresenham_calculus(k, objet, l, m)
{
    let a = 0;


    
    if (objet[k].x > objet[k+l].x) 
    {
        a = l; l = 0;
    }

    for (let x = objet[k+a].x; x < objet[k+l].x; x++) {

        let y = (objet[k+l].y - objet[k+a].y) / (objet[k+l].x - objet[k+a].x) ;
            y *= (x - objet[k+a].x);
            y += objet[k+a].y;

            m.push({"x": x, "y": y});
            
    }


    return m;
    
}





function condition_loop(m, objet, k, l)
{

    m = calculus_Y(objet, k, m, l);
    m = calculus_X(objet, k, m, l);

    m = bresenham_calculus(k, objet, l, m);


    return m;
}
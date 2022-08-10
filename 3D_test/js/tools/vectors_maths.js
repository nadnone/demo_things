
function norme(a) {
    
    return Math.sqrt( a[0]**2 + a[1]**2 )
}

function scalar_product(a, factor)
{
    return a[0] * factor + a[1] * factor + a[2] * factor;
}

function dot(a, b)
{
    return (a[0] * b[1]) + (a[1] * b[0]);
}


function angle_vector(a, b)
{
    return dot(a, b) / (norme(a) * norme(b))
}


function cross_product(a, b)
{
    return (a[0] * b[1]) - (a[1] * b[0]);
}

function addition(a,b)
{
    let v = [];

    v[0] = a[0] + b[0];
    v[1] = a[1] + b[1];
    v[2] = a[2] + b[2];

    return v;
}

function soustraction(a,b)
{
    let v = [];

    v[0] = a[0] - b[0];
    v[1] = a[1] - b[1];
    v[2] = a[2] - b[2];

    return v;
}

function multiply(a, b)
{



    // A REVOIR

    let columns = []
    for (let l = 0; l < 3; l++) {
        
        let row = []
        for (let w = 0; w < 3; w++) {

            row[w] = a[0][w] * b[l][0] + a[1][w] * b[l][1] + a[2][w] * b[l][2];
        }
        columns.push(row);

        
    }

    return columns;
}


export { soustraction,scalar_product, multiply, addition, dot, cross_product, norme, angle_vector}
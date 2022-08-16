
function norme(a) {
    
    return Math.sqrt( a[0]**2 + a[1]**2 + a[2]**2 )
}

function normaliser(a)
{
    return scalair(a, 1/norme(a));
}

function scalair(a, factor)
{
    let r = [];

    for (let i = 0; i < a.length; i++) {
        r[i] = a[i] * factor;
    }

    return r
}
function produit_scalair(a, b)
{
    return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2])
}



function angle_vector(a, b)
{
    return produit_scalair(a, b) / (norme(a) * norme(b))
}


function produit_vectoriel(a, b)
{
    let v = [];

    v[0] = (a[1] * b[2]) - (a[2] * b[1])
    v[1] = (a[2] * b[0]) - (a[0] * b[2])
    v[2] = (a[0] * b[1]) - (a[1] * b[0])


    return v;
}


function determinant_3x3(m)
{

    /*
        Règle de Sarrus :

            x 0 0   0 x 0   0 0 x   0 0 x   0 x 0   x 0 0
            0 x 0 + 0 0 x + x 0 0 - 0 x 0 - x 0 0 - 0 0 x
            0 0 x   x 0 0   0 x 0   x 0 0   0 0 x   0 x 0
    */

    let r_m = m[0][0] * m[1][1] * m[2][2]
        r_m += m[1][0] * m[2][1] * m[2][0]
        r_m += m[2][0] * m[0][1] * m[1][2]

        r_m -= m[2][0] * m[1][1] * m[0][2]
        r_m -= m[1][0] * m[0][1] * m[2][2]
        r_m -= m[0][0] * m[2][1] * m[1][2]
        

    return r_m;

}

function determinant_4x4(m)
{

    /*
        Règle de Sarrus :
               1         2         3         4         5         6         7         8
            x 0 0 0   0 x 0 0   0 0 x 0   0 0 0 x   0 0 0 x   0 0 x 0   0 x 0 0   x 0 0 0
            0 x 0 0 + x 0 x 0 + 0 0 0 x + 0 0 0 0 - 0 0 x 0 - 0 x 0 x - x 0 0 0 - 0 0 0 0
            0 0 x 0   0 x 0 x   x 0 0 0   0 0 0 0   0 x 0 0   x 0 x 0   0 0 0 x   0 0 0 0
            0 0 0 x   0 0 x 0   0 x 0 0   x 0 0 0   x 0 0 0   0 x 0 0   0 0 x 0   0 0 0 x
    */

    let r_m = m[0][0] * m[1][1] * m[2][2] * m[3][3] // 1
        r_m += m[1][0] * m[2][1] * m[3][2] * m[0][1] * m[1][2] * m[2][3] // 2
        r_m += m[2][0] * m[3][1] * m[0][2] * m[1][3] // 3
        r_m += m[3][0] * m[0][3] // 4

        r_m -= m[3][0] * m[2][1] * m[1][2] * m[0][3] // 5
        r_m -= m[2][0] * m[1][1] * m[0][2] * m[3][1] * m[2][2] * m[1][3] // 6
        r_m -= m[1][0] * m[0][1] * m[3][2] * m[2][3] // 7
        r_m -= m[0][0] * m[3][3]

    return r_m;

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

function soustraction_2d(a,b)
{
    let v = [];

    v[0] = a[0] - b[0];
    v[1] = a[1] - b[1];

    return v;
}

function multiply(a, b)
{
 
    let m = []
    for (let i = 0; i < 3; i++) {
        
        let row = [0,0,0]
        for (let j = 0; j < 3; j++) {

            for (let k = 0; k < 3; k++) {

                row[j] += a[i][k] * b[k][j]

            }

        }
        m.push(row)

    }

    return m
}

export { multiply,
        soustraction_2d, 
        normaliser,
        determinant_4x4,
        soustraction, 
        scalair,determinant_3x3,
        addition, produit_scalair, 
        produit_vectoriel, 
        norme, 
        angle_vector
    }
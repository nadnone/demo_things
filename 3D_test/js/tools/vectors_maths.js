
function produit_vectoriel(a,b)
{
    return (a[1] * b[0]) - (a[0] * b[1]);
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
        produit_vectoriel
    }
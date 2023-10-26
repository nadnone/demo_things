
function gen_cells(n)
{
    let matrice = [];
    for (let i = 0; i < n; i++) {
        
        let row = [];
        for (let j = 0; j < n; j++) {
            
            row.push({"walls" : {
                    "L": 0,
                    "R": 0,
                    "U": 0,
                    "D": 0
                },
                "visited": false,
            });
        }
        matrice.push(row);
        
    }

    return matrice;
}

function random_vector()
{
    let randX = 0, randY = 0;

    const rand_range = Math.floor(Math.random() * 3)
    const rand_xy = Math.floor(Math.random() * 2);

    if (rand_xy > 0)
    {
        randX = 1 - rand_range
    }
    else
    {
        randY = 1 - rand_range 
    }

    return [randX, randY];
}

// check si tout les côtés sont visité
function check_adjacent_visited(matrice, point)
{
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const x = point.x + i;
            const y = point.y + j

            if (x >= matrice.length || y >= matrice[0].length || x < 0 || y < 0)
            {
                continue
            }

            if (!matrice[x][y].visited)
            {
                return false
            }
        }        
    }

    return true;
}

// on créer un nouveau chemin, du coup on clean le stack pour recommencer
function new_path(data)
{

    // check si au moins un mur est fermé
    data.stack_path = []
    data.state = "active after back"
    return data


}

// pour verifier si on a visité tout le tableau
function check_matrice_visited(data) {

    for (let i = 0; i < data.matrice.length; i++) {
        for (let j = 0; j < data.matrice.length; j++) {
            
            if (!data.matrice[i][j].visited)
            {
                return false
            }
        }
    }

    return true
}

export {
    gen_cells,
    random_vector,
    check_adjacent_visited,
    new_path,
    check_matrice_visited
}
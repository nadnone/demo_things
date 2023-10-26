import { MAX_DEPTH } from "./constants.js";
import { controlled_recursive_func } from "./main.js";

function gen_cells(n)
{
    let matrice = [];
    for (let i = 0; i < n; i++) {
        
        let row = [];
        for (let j = 0; j < n; j++) {
            
            const infos = {
                "walls" : {
                    "R": 0,
                    "D": 0
                },
                "visited": false,
            }
            row.push(infos)
       
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

// on créer un nouveau chemin, du coup on clean le depth pour recommencer
function new_path(data)
{

    const tmp_pos = data.stack[(data.stack.length - Math.floor(data.depth * 1/data.cycle))]
    
    if (tmp_pos == null)
    {
        data.depth = MAX_DEPTH
        data.state = "failure"
        data.cycle++
        return data
    }

    if (!check_adjacent_visited(data.matrice, tmp_pos))
    {
        data.x = tmp_pos.x
        data.y = tmp_pos.y
        data.cycle = 1
        data.depth = 0 // on reset la profondeur du chemin choisi
        return controlled_recursive_func(data)
    }


    data.depth = MAX_DEPTH
    return data
}


export {
    gen_cells,
    random_vector,
    check_adjacent_visited,
    new_path
}
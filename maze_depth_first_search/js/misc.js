import { STATES } from "./constants.js";
import { draw_cursor } from "./draw.js";
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


function check_matrice_visited(data)
{

    for (let i = 0; i < data.matrice.length; i++) {
        for (let j = 0; j < data.matrice.length; j++) {

            if (!data.matrice[i][j].visited)
            {
                return false
            }
        }        
    }
    return true;
}

// on créer un nouveau chemin, du coup on clean le depth pour recommencer
function new_path_recursive(data)
{
    // animation curseur
    draw_cursor(data)


    const tmp_pos = data.stack[(data.stack.length - data.cycle - 1)]
    
    if (tmp_pos == null)
    {
        // si erreur, on recommence
        data.cycle = 0
        data.state = STATES.BACK
        return data
    }
    else if (!check_adjacent_visited(data.matrice, tmp_pos))
    {
        // position trouvée, on recontinue à creuser
        data.x = tmp_pos.x
        data.y = tmp_pos.y
        data.cycle = 0 // on reset les tentatives
        data.depth = 0 // on reset la profondeur du chemin choisi
        data.state = STATES.ACTIVE
        return controlled_recursive_func(data)
    }
    else
    {
        // on continue de backtrace
        data.cycle++
        return new_path_recursive(data)
    }
}


export {
    gen_cells,
    random_vector,
    check_adjacent_visited,
    new_path_recursive,
    check_matrice_visited
}
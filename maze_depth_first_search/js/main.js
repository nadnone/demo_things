import {draw_cell, draw_cursor} from "./draw_cell.js";

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
function check__adjacent_visited(matrice, point)
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

function controlled_loop(data)
{
    // choose a random wall at thestarting point and carve a passage though
    let [rx, ry] = random_vector(); 
    let random_wall = {
        "x": rx + data.x,
        "y": ry + data.y
    }

    // cheeck boundaries and randoms 0
    if (random_wall.x < 0 || random_wall.y < 0 || random_wall.x >= data.matrice.length || random_wall.y >= data.matrice[0].length || rx+ry === 0)
    {
        data.state = "failure bound"
        return data
    }

    // only if it isn't visited
    if (!data.matrice[random_wall.x][random_wall.y].visited)
    {


        // on ajoute au stack
        data.stack_path.push({"x": random_wall.x, "y": random_wall.y});

        // check if wall already open
        if (
            data.matrice[random_wall.x][random_wall.y].walls.L > 0 && rx < 0 ||
            data.matrice[random_wall.x][random_wall.y].walls.R > 0 && rx > 0 ||
            data.matrice[random_wall.x][random_wall.y].walls.U > 0 && ry > 0 ||
            data.matrice[random_wall.x][random_wall.y].walls.D > 0 && ry < 0
            )
        {
            data.state = "failure check"
            return data
        }

        // carve a passage though
        if (rx < 0)
        {
            data.matrice[random_wall.x][random_wall.y].walls.L += 1; // 1 = +1; 0 = -1;
        }
        if (rx > 0)
        {
            data.matrice[random_wall.x][random_wall.y].walls.R += 1; // 1 = +1; 0 = -1;
        }      
        if (ry < 0)
        {
            data.matrice[random_wall.x][random_wall.y].walls.D += 1; // 1 = +1; 0 = -1;
        }
        if (ry > 0)
        {
            data.matrice[random_wall.x][random_wall.y].walls.U += 1; // 1 = +1; 0 = -1;
        }


        data.matrice[random_wall.x][random_wall.y].visited = true;

        // si toutes les cellules voisines n'ont pas été visités
        if (!check__adjacent_visited(data.matrice, random_wall))
        {
            data.x = random_wall.x
            data.y = random_wall.y
            data.state = "active"
            return data
        }
       
    }   

    data.x = random_wall.x
    data.y = random_wall.y
    data.state = "back"
    return data
}


function backtrace(data)
{
    const walls = data.matrice[data.x][data.y].walls;

    // check si au moins un mur est fermé
    if (walls.R < 1 || walls.L < 1 || walls.U < 1 || walls.D < 1)
    {
        data.matrice[data.x][data.y].color++
        data.state = "active after back"
        data.stack_path = [];
        return data
    }
    else
    {
        // on retourne en arrière grace au stack
        let back = data.stack_path.pop()
        data.x = back.x
        data.y = back.y
        data.state = "back"
        return data
    }

}

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

function gen_maze()
{
    const matrice = gen_cells(10); // 

    let stack_path = [];

    // pick starting point
    const start_x = 0
    const start_y = 0
    matrice[start_x][start_y].visited = true;
    stack_path.push({"x": start_x, "y": start_y});

    let data = {
        "x": start_x,
        "y": start_y,
        "matrice": matrice,
        "stack_path": stack_path,
    };

    let debug = setInterval(() => {
           
        if (check_matrice_visited(data))
        {   
                console.log("finish");
                clearInterval(debug)
                return;
        }

        if (data.state === "back" || data.state === "visited" || data.stack_path.length > 5)
        {
                data = backtrace(data)
        }
        else
        {
                data = controlled_loop(data);
                draw_cell(data);
        }
       
        draw_cursor(data)

    }, 5);
     
    
       

}

gen_maze()
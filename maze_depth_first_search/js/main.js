import {draw_cell} from "./draw_cell.js";

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

function controlled_loop(m, curr_x, curr_y, stack_path)
{
    // choose a random wall at thestarting point and carve a passage though
    let [rx, ry] = random_vector(); 
    let random_wall = {
        "x": rx + curr_x,
        "y": ry + curr_y
    }

    // cheeck boundaries and randoms 0
    if (random_wall.x < 0 || random_wall.y < 0 || random_wall.x >= m.length || random_wall.y >= m[0].length || rx+ry === 0)
    {
        return {
            "matrice": m,
            "x": curr_x,
            "y": curr_y,
            "state": "failure bound"
        };
    }

    // only if it isn't visited
    if (!m[random_wall.x][random_wall.y].visited)
    {


        // on ajoute au stack
        stack_path.push({"x": random_wall.x, "y": random_wall.y});

        // check if wall already open
        if (
            m[random_wall.x][random_wall.y].walls.L > 0 && rx < 0 ||
            m[random_wall.x][random_wall.y].walls.R > 0 && rx > 0 ||
            m[random_wall.x][random_wall.y].walls.U > 0 && ry > 0 ||
            m[random_wall.x][random_wall.y].walls.D > 0 && ry < 0
            )
        {
            return {
                "matrice": m,
                "x": curr_x,
                "y": curr_y,
                "state": "failure check"
            };
        }

        // carve a passage though
        if (rx < 0)
        {
            m[random_wall.x][random_wall.y].walls.L += 1; // 1 = +1; 0 = -1;
        }
        if (rx > 0)
        {
            m[random_wall.x][random_wall.y].walls.R += 1; // 1 = +1; 0 = -1;
        }      
        if (ry < 0)
        {
            m[random_wall.x][random_wall.y].walls.D += 1; // 1 = +1; 0 = -1;
        }
        if (ry > 0)
        {
            m[random_wall.x][random_wall.y].walls.U += 1; // 1 = +1; 0 = -1;
        }


        m[random_wall.x][random_wall.y].visited = true;

        // si toutes les cellules voisines ont été visités
        if (check__adjacent_visited(m, random_wall))
        {
            return {
                "matrice": m,
                "x": random_wall.x,
                "y": random_wall.y,
                "state": "back"
            };
        }
        else
        {
            return {
                "matrice": m,
                "x": random_wall.x,
                "y": random_wall.y,
                "state": "active"
            };
        }
    }   

    return {
        "matrice": m,
        "x": random_wall.x,
        "y": random_wall.y,
        "state": "back"
    };
}


function backtrace(data, stack_path)
{
    const walls = data.matrice[data.x][data.y].walls;

    // check si au moins un mur est fermé
    if (walls.R < 1 || walls.L < 1 || walls.U < 1 || walls.D < 1)
    {

        return {
            "matrice": data.matrice,
            "x": data.x,
            "y": data.y,
            "state": "active after back"
        };
       
    }
    else
    {
        // on retourne en arrière grace au stack
        let back = stack_path.pop();

 
        return {
            "matrice": data.matrice,
            "x": back.x,
            "y": back.y,
            "state": "back"
        };
      
    }

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

    let data = controlled_loop(matrice, start_x, start_y, stack_path);

    
    while (true) {
        
        if (stack_path.length === 0 || stack_path.length >= matrice.length**2)
        {   
                console.log("finish");
                return;
        }

        if (data.state === "back" || data.state === "visited")
        {
                data = backtrace(data, stack_path)
        }
        else
        {
                data = controlled_loop(data.matrice, data.x, data.y, stack_path);
        }
       
        draw_cell(data);
    }
    
       

}

gen_maze()
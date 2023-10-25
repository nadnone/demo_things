import draw_cell, { draw_cursor } from "./draw_cell.js";

function gen_cells(n)
{
    let matrice = [];
    for (let i = 0; i < n; i++) {
        
        let row = [];
        for (let j = 0; j < n; j++) {
            
            row.push({"wallLR": 2, "wallUD": 2, "visited": false});
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


function check_visited(matrice)
{
    for (let i = 0; i < matrice.length; i++) {
        
        for (let j = 0; j < matrice[i].length; j++) {

            if (!matrice[i][j].visited)
            {
                return true;
            }
            
        }
    }

    return false;
}

function controlled_loop(m, curr_x, curr_y)
{

    if (!check_visited(m))
    {
        return {
            "matrice": m,
            "x": curr_x,
            "y": curr_y,
            "state": "finish"
        };
    }

    const [x, y] = random_vector()

    // check boundaries
    let px = (x + curr_x) 
    let py = (y + curr_y) 

    if (px < 0 || py < 0 || px >= m.length || py >= m[0].length)
    {
        return {
            "matrice": m,
            "x": curr_x,
            "y": curr_y,
            "state": "failure"
        };
    }

    if (!m[px][py].visited)
    {
        // remove wall
        if (px - curr_x !== 0)
        {
            m[px][py].wallLR = px - curr_x;
        }
        if (py - curr_y !== 0)
        {
            m[px][py].wallUD = py - curr_y;
        }

        // mark as visited
        m[px][py].visited = true;
       

        return {
            "matrice": m,
            "x": px,
            "y": py,
            "state": "active"
        };

    }

    // if visited
    return {
        "matrice": m,
        "x": px,
        "y": py,
        "state": "visited"
    };

}

function gen_maze()
{
    const matrice = gen_cells(10); // 

    // pick a random cell
    const curr_x = Math.floor(Math.random() * (matrice.length -1))
    const curr_y = Math.floor(Math.random() * (matrice[0].length -1))
    // mark it as visited
    matrice[curr_x][curr_y].visited = true;
    
    let data = controlled_loop(matrice, curr_x, curr_y);


    let debug = setInterval(() => {
    
        data = controlled_loop(data.matrice, data.x, data.y);

        if (data.state === "finish")
        {
            console.log("finish");
            clearInterval(debug)
            return
        }
 
        draw_cell(data.matrice);
        draw_cursor(data)

    }, 5);
    

}



gen_maze()
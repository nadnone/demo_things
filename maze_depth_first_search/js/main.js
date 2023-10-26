import { INIT_MATRICE, MAX_DEPTH } from "./constants.js";
import {draw_cell, draw_cursor, printf} from "./draw.js";
import { check_adjacent_visited, check_matrice_visited, gen_cells, new_path, random_vector } from "./misc.js";


function controlled_recursive_func(data)
{
    // on choisi un vector aléatoire pour trouver un voisin
    let [rx, ry] = random_vector(); 
    let random_wall = {
        "x": rx + data.x,
        "y": ry + data.y
    }

    // on verifie les limites et les nombres aléatoires
    if (random_wall.x < 0 || random_wall.y < 0 || random_wall.x >= data.matrice.length || random_wall.y >= data.matrice[0].length || rx+ry === 0)
    {
        data.state = "failure bound"
        return data
    }

    // si pas visité
    if (!data.matrice[random_wall.x][random_wall.y].visited)
    {


        // on ajoute au stack
        data.stack_path.push({"x": random_wall.x, "y": random_wall.y});

        // on verifie si le mur n'est pas déjà ouvert
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

        // on casse le mur
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


        // on dit qu'on est passé par là
        data.matrice[random_wall.x][random_wall.y].visited = true;

    }   

    data.x = random_wall.x
    data.y = random_wall.y

    // si tout les adjacents n'ont pas été visités
    if (!check_adjacent_visited(data.matrice, random_wall) && data.stack_path.length < MAX_DEPTH)
    {
        data.state = "active"
        return controlled_recursive_func(data);
    }
    else // sinon on créer un nouveau chemin
    {
        data.state = "back"
        return new_path(data)
    }


}

let touch = false

function gen_maze()
{
    // pour créer une matrice carrée vide de X lignes et colonnes
    const matrice = gen_cells(INIT_MATRICE);
    let stack_path = [];

    // point de départ
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
        



        // calcul
        data = controlled_recursive_func(data);

        // animation
        draw_cell(data)
        draw_cursor(data)

        if (check_matrice_visited(data))
        {   
                console.log("finish");
                clearInterval(debug)
                touch = false;
                return;
        }





    }, 5);
     
    
       

}


printf("Press any key to start", document.body.clientWidth/2 - 23*12, document.body.clientHeight/2);
printf("(or touch the screen)", document.body.clientWidth/2 - 23*12, document.body.clientHeight/2 + 12*6);

window.addEventListener("keypress", () => 
{
    touch = true;
    gen_maze()
});

window.addEventListener("touchstart", () => 
{
    if (!touch)
    {
        touch = true;
        gen_maze()
    }

});

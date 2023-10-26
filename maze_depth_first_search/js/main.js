import { INIT_MATRICE, MAX_DEPTH } from "./constants.js";
import {draw_cell, draw_cursor, printf, wipe} from "./draw.js";
import { check_adjacent_visited, check_matrice_visited, gen_cells, new_path_recursive, random_vector } from "./misc.js";


export function controlled_recursive_func(data)
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
        data.state = data.state !== "back next unvisited" ? "failure bound" : data.state
        return data
    }

    // si pas visité
    if (!data.matrice[random_wall.x][random_wall.y].visited)
    {


        // on incrémente la profondeur
        data.depth++
        // on push dans le stack
        data.stack.push({"x": data.x, "y": data.y})

        // on verifie si le mur n'est pas déjà ouvert
        if (
            data.matrice[random_wall.x][random_wall.y].walls.L > 0 && rx < 0 ||
            data.matrice[random_wall.x][random_wall.y].walls.R > 0 && rx > 0 ||
            data.matrice[random_wall.x][random_wall.y].walls.U > 0 && ry > 0 ||
            data.matrice[random_wall.x][random_wall.y].walls.D > 0 && ry < 0
            )
        {
            // si c'est déjà ouvert un inverse
            data.state = "failure check"
            return data
        }

        // on casse le mur
        if (rx < 0)
        {
            data.matrice[data.x][data.y].walls.R = 1; // 1 = +1; 0 = -1;
        }
        if (rx > 0)
        {
            data.matrice[random_wall.x][random_wall.y].walls.R = 1; // 1 = +1; 0 = -1;
        }      
        if (ry < 0)
        {
            data.matrice[data.x][data.y].walls.D = 1; // 1 = +1; 0 = -1;

        }
        if (ry > 0)
        {
            data.matrice[random_wall.x][random_wall.y].walls.D = 1; // 1 = +1; 0 = -1;
        }


        // on dit qu'on est passé par là
        data.matrice[random_wall.x][random_wall.y].visited = true;
        data.state = "active"
    }    
 
    data.x = random_wall.x
    data.y = random_wall.y

    // animation curseur
    draw_cursor(data)

    // si tout les adjacents n'ont pas été visité + ce n'est pas le résultat du backtrace
    if (!check_adjacent_visited(data.matrice, random_wall) && data.depth < MAX_DEPTH && data.state === "back next unvisited")
    {
        return controlled_recursive_func(data);
    }
    else // sinon on créer un nouveau chemin
    {
        data.state = "back"
        return new_path_recursive(data)
    }


}

let touch = false // pour le touch-creen

function gen_maze()
{
    // pour créer une matrice carrée vide de X lignes et colonnes
    const matrice = gen_cells(INIT_MATRICE);

    // point de départ
    const start_x = 0
    const start_y = 0
    matrice[start_x][start_y].visited = true;
    let stack = [{
        "x": start_x,
        "y": start_y
    }]
    let data = {
        "x": start_x,
        "y": start_y,
        "matrice": matrice,
        "depth": 0,
        "cycle": 1,
        "stack": stack
    };

    let debug = setInterval(() => {
        
        // nettoyage par frame
        wipe();
        
        // animation
        draw_cell(data)
        
        // calcul
        data = controlled_recursive_func(data);

        printf("Fail [x]", 100,100, "#ff0000")
        printf("Active [x]", 100,100 + 48*2, "#00ff00")
        printf("Backtrace [x]", 100,100 + 48*4, "#ffffff")

        // si le chemin est passé partout, alors c'est fini
        if (check_matrice_visited(data))
        {   
                console.log("finish");
                draw_cell(data)
                clearInterval(debug)
                touch = false;
                return;
        }


    }, 0);
     
    
       

}


printf("Press any key to start", document.body.clientWidth/2 - 23*12, document.body.clientHeight/2);
printf("(or touch the screen)", document.body.clientWidth/2 - 23*12, document.body.clientHeight/2 + 12*6);

window.addEventListener("keypress", () => 
{
    if (!touch)
    {
        touch = true;
        gen_maze()
    }
});

window.addEventListener("touchstart", () => 
{
    if (!touch)
    {
        touch = true;
        gen_maze()
    }

});

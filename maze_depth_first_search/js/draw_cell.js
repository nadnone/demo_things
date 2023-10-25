
let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d");

let width = document.body.clientWidth
let height = document.body.clientHeight

canvas.width = width;
canvas.height = height;

export function draw_cell(data) {
    
    const m = data.matrice;


    const SCALE = {
        "x": width / m.length,
        "y": height / m.length
    }


    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {

            const cell = m[i][j];


            
            // draw the cell
            ctx.beginPath()
            ctx.fillStyle = cell.visited ? "#000000" : "#b5b5b5"
            ctx.fillRect((i * SCALE.x), (j * SCALE.y), SCALE.x, SCALE.y);
            ctx.closePath()

            // draw the walls X
            ctx.beginPath()
            ctx.fillStyle = cell.walls.L > 0 || cell.walls.R > 0 ? "#000000" : "#ffffff"
            ctx.fillRect((i * SCALE.x - cell.walls.L), (j * SCALE.y), SCALE.x/6, SCALE.y);
            ctx.fillRect((i * SCALE.x + cell.walls.R), (j * SCALE.y), SCALE.x/6, SCALE.y);
            ctx.closePath()

            // draw the walls Y
            ctx.beginPath()
            ctx.fillStyle = cell.walls.U > 0 || cell.walls.D > 0  ? "#000000" : "#ffffff"
            ctx.fillRect((i * SCALE.x), (j * SCALE.y - cell.walls.U), SCALE.x, SCALE.y/6);
            ctx.fillRect((i * SCALE.x), (j * SCALE.y + cell.walls.D), SCALE.x, SCALE.y/6);
            ctx.closePath()


        }
            
    }
}


export function draw_cursor(data)
{
    const m = data.matrice;


    const SCALE = {
        "x": width / m.length,
        "y": height / m.length
    }

    // draw the cell
    ctx.beginPath()
    ctx.fillStyle = "#ff0000"
    ctx.fillRect((data.x * SCALE.x), (data.y * SCALE.y), SCALE.x, SCALE.y);
    ctx.closePath()
}
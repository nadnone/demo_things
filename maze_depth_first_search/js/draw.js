
let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d");

let width = document.body.clientWidth 
let height = document.body.clientHeight 

canvas.width = width;
canvas.height = height;

export function printf(text, x, y)
{
    ctx.fillStyle = "#00ff00"
    ctx.font = "48pt serif"
    ctx.fillText(text, x, y)
}

export function draw_cell(data) {
    
    const m = data.matrice;


    const SCALE = {
        "x": width / (m.length + 1),
        "y": height / (m.length + 1)
    }



    for (let i = 0; i <= m.length; i++) {
        for (let j = 0; j <= m.length; j++) {


            if (i < 1 || i >= m.length || j < 1 || j >= m.length)
            {
                // draw the cell
                ctx.beginPath()
                ctx.fillStyle = "#000000"
                ctx.fillRect((i * SCALE.x), (j * SCALE.y), SCALE.x, SCALE.y);
                ctx.closePath()
                continue

            }

            const cell = m[i - 1][j - 1];

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

    // draw the cursor
    ctx.beginPath()
    ctx.fillStyle = "#00ff00"
    ctx.fillRect((data.x * SCALE.x + SCALE.x/2), (data.y * SCALE.y + SCALE.y/2), SCALE.x/4, SCALE.y/4);
    ctx.closePath()
}
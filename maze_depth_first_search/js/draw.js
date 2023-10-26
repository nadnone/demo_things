let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d");

let width = document.body.clientWidth - 120
let height = document.body.clientHeight - 120

canvas.width = width;
canvas.height = height;
canvas.style.position = "absolute"
canvas.style.left = "60px"
canvas.style.top = "60px"

document.body.style.backgroundColor = "#000000"

const WALL_SIZE = width / height * 4

export function wipe()
{
    ctx.clearRect(0,0, width, height)

}

export function printf(text, x, y, color="#00ff00")
{
    ctx.fillStyle = color
    ctx.font = "48pt serif"
    ctx.fillText(text, x, y)
}

export function draw_cell(data) {
    
    const m = data.matrice;


    const SCALE = {
        "x": width / m.length,
        "y": height / m.length 
    }


    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m.length; j++) {

            const cell = m[i][j];

            // draw the cell
            ctx.beginPath()
            ctx.fillStyle = cell.visited ? "#000000" : "#b5b5b5"
            ctx.fillRect((i * SCALE.x), (j * SCALE.y), SCALE.x, SCALE.y);

            // draw the walls X
            ctx.fillStyle = cell.walls.R > 0 ? "#000000" : "#ffffff"
            ctx.fillRect(i * SCALE.x - WALL_SIZE, j * SCALE.y, WALL_SIZE, SCALE.y);

            // draw the walls Y
            ctx.fillStyle = cell.walls.D > 0  ? "#000000" : "#ffffff"
            ctx.fillRect(i * SCALE.x, j * SCALE.y - WALL_SIZE, SCALE.x, WALL_SIZE);
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
import { STATES } from "./constants.js";

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
const fontsize = width/height * 48;

export function wipe()
{
    ctx.clearRect(0,0, width, height)

}

export function printf(text, x, y, color="#00ff00")
{
    const _x = x / width 
    const _y = y

    ctx.fillStyle = color
    ctx.font = `${fontsize}px serif`
    ctx.fillText(text, _x, _y)
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
            ctx.fillStyle = cell.visited ? "#000000" : "#555555"
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
    if (data.state == null)
    {
        return
    }

    const m = data.matrice;

    const SCALE = {
        "x": width / m.length,
        "y": height / m.length
    }

    // draw the cursor
    ctx.beginPath()

    const color = data.state === STATES.BACK ? "#ffffff" : "#00ff00"
    ctx.fillStyle = data.state === STATES.FAILURE ? "#ff0000" : color

    ctx.fillRect((data.x * SCALE.x + SCALE.x/2), (data.y * SCALE.y + SCALE.y/2), SCALE.x/4, SCALE.y/4);
    ctx.closePath()
}
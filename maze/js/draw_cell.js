
let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d");

let width = document.body.clientWidth
let height = document.body.clientHeight

canvas.width = width;
canvas.height = height;

export default function draw_cell(m) {
    

    ctx.clearRect(0,0, width, height)

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
            ctx.fillRect((i * SCALE), (j * SCALE), SCALE, SCALE);
            ctx.closePath()

            // draw the walls
            ctx.beginPath()
            ctx.fillStyle = "#ffffff"

            if (cell.wallLR < 2)
            {
                ctx.fillRect((i * SCALE.x - SCALE.x * cell.wallLR), (j * SCALE.y), SCALE.x/6, SCALE.y);
            }
            if (cell.wallUD < 2)
            {
                ctx.fillRect((i * SCALE.x), (j * SCALE.y) - SCALE.y * cell.wallUD, SCALE.x, SCALE.y/6);
            }

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
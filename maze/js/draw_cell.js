
let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d");

const WIDTH = 800/2

export default function draw_cell(m) {
    
    const SCALE = WIDTH/m.length*2


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
            ctx.fillStyle = cell.visited ? "#ffffff" : "#ffffff"

            if (cell.wallLR < 2)
            {
                ctx.fillRect((i * SCALE - SCALE * cell.wallLR), (j * SCALE), SCALE/6, SCALE);
            }
            if (cell.wallUD < 2)
            {
                ctx.fillRect((i * SCALE), (j * SCALE) - SCALE * cell.wallUD, SCALE, SCALE/6);
            }

            ctx.closePath()

        }
            
    }

}
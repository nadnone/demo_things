let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const N = 800;
canvas.height = N;
canvas.width = N;
canvas.style.backgroundColor = "black";

let vector = {
    "x": 0,
    "y": 0
};

function drawPixel(p, c, s)
{
    ctx.beginPath();
    ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
    ctx.fillRect(p.x, p.y, s, s);
    ctx.closePath();
}


async function bezier(t)
{
    let green = {"r": 0, "g": 255, "b": 0};
    let red = {"r": 255, "g": 0, "b": 0};

    // les points
    let p_1 = {"x": 5, "y": 5};
    let p_2 = {"x": 5, "y": N - 15};
    let p_3 = {"x": N - 15, "y": N - 15};
    drawPixel(p_1, green, 10);
    drawPixel(p_2, green, 10);
    drawPixel(p_3, green, 10);

    // formule de bezier
    let b_x = p_1.x * (1 - t)**3 + 3 * p_2.x * t * (1 - t)**2 + 3 * p_3.x * t**2 * (1 - t) + p_3.x * t**3;
    let b_y = p_1.y * (1 - t)**3 + 3 * p_2.y * t * (1 - t)**2 + 3 * p_3.y * t**2 * (1 - t) + p_3.y * t**3;

    drawPixel({"x": b_x, "y": b_y}, red, 10);

}



let t = 0;
function loop()
{

    t += 0.001;

    bezier(t);

    if (t > 1) t = 0;

}


setInterval(loop, 1);
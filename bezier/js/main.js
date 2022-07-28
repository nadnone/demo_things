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
    let a = {"x": 5, "y": 5};
    let b = {"x": 5, "y": N - 15};
    let c = {"x": N - 15, "y": N - 15};
    drawPixel(a, green, 10);
    drawPixel(b, green, 10);
    drawPixel(c, green, 10);

    /* formule de bezier degrée 2
        B(t) = A*(1 - t)**2 + 2*B*t*(1 - t) + C*t**2
    */
    let x = a.x*(1 - t)**2 + 2*b.x*t*(1 - t) + c.x*t**2
    let y = a.y*(1 - t)**2 + 2*b.y*t*(1 - t) + c.y*t**2

    drawPixel({"x": x, "y": y}, red, 10);

}



let t = 0;
function loop()
{

    t += 0.001;

    bezier(t);

    if (t > 1) t = 0;

}


setInterval(loop, 1);
import { N, P_nb, P_size, ctx } from "./misc.js"
import Particle from "./Particle.js";

let particles_list = [];

const START_X = N - N/2;
const START_Y = N - 100;

const FORCE = {
    "x": 0,
    "y": -5
};

function torch()
{
    ctx.beginPath();
    ctx.fillStyle = `#555555`;
    ctx.fillRect(START_X - 12.5, START_Y + 10, 25, 100);
    ctx.closePath();
}


function dissipation()
{
    for (let i = 0; i < particles_list.length; i++) {

        let seed = Math.floor(Math.random() * (5 + 5 + 1)) - 5;

        particles_list[i].x += seed + FORCE.x;
        particles_list[i].y += seed + FORCE.y;

        particles_list[i].lifetime -= 3;

        let p = particles_list[i];

        if (p.x > N || p.x < 0 || p.y < 0 || p.y > N) particles_list.splice(i, 1);

        draw_smoke(p.x, p.y, p.lifetime);

    }
}

function draw_smoke(x, y, c)
{
    ctx.beginPath();
    ctx.fillStyle = `rgb(${c}, ${c}, 0)`;
    ctx.arc(x, y, P_size/2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function smoke()
{
    let seed = Math.floor(Math.random() * (5 + 5 + 1)) - 5;

    let p = new Particle();
    p.x = START_X + seed;
    p.y = START_Y + seed;

    particles_list.push(p);
    

}


export { smoke, torch, dissipation }
import { EYE, canvas, ctx, WORLD } from "./misc.js";
import Car from "./Car.js";
import Input_Event from "../Input_Event.js";


let player = null;
let input = null;

let map = null;

let initialPos = [46.98951, 6.92855]

function init()
{
    // canvas
    canvas.height = EYE.h;
    canvas.width = EYE.w;

    let style = document.documentElement.style;
             
    style.setProperty("--height_var",`${EYE.h}px`);
    style.setProperty("--width_var",`${EYE.w}px`);

    //canvas.style.backgroundColor = ;

    // player
    player = new Car();
    player.pos.x = initialPos[0];
    player.pos.y = initialPos[1];

    // Input Event
    input = new Input_Event();
    map = L.map('map', {renderer: L.canvas()}).setView(initialPos, 19);
    
    var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}

function drawMap(data)
{
    //ctx.beginPath();
    //ctx.drawImage(img, data.pos.x, data.pos.y, WORLD.w, WORLD.h);
    //ctx.closePath();

    let x = data.pos.x
    let y = data.pos.y

    map.setView(new L.LatLng(x , y ), 19, {animation : true});

}


let t = 0;

function loop()
{

    let t0 = performance.now();


    // refresh
    ctx.clearRect(0, 0, EYE.w, EYE.h);

    // map
    drawMap(player.getData());

    // player

    player.drive_control(input);

    player.draw(ctx);

    let t1 = performance.now();
    t = t1 - t0;
}



init();

setInterval(loop, 60);
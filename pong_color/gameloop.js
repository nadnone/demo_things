import { C_CENTER } from './constantes.js'

let B_time = 0;

function gameloop(player1, context, ball, ia, statsBar)
{
    let A_time = Date.now();
    let delta_time = (A_time - B_time) / 1000;

    context.clearRect(0,0, C_CENTER.w, C_CENTER.h);
    
    // static
    draw_net(context);

    // dynamic
    player1.update();
    ball.update(delta_time, player1);
    ia.update(ball);

    statsBar.update(ball);

    B_time = Date.now(); 
}

function draw_net(context){

    // net
    context.beginPath();
    context.fillStyle = "#FFFFFF"
    context.rect(C_CENTER.x - 5, 0, 10, C_CENTER.h);
    context.fill();

}

export { gameloop }
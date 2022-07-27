import { C_CENTER, PLAYER_DIM } from "./constantes.js";

export class IA {
    constructor(context, statsBar)
    {
        this.x = C_CENTER.w - PLAYER_DIM.w*2;
        this.y = C_CENTER.h - PLAYER_DIM.h/2;
        this.w = PLAYER_DIM.w;
        this.h = PLAYER_DIM.h;

        this.context = context;

        this.statsBar = statsBar;
    }
    update(ball)
    {

        this.y = ball.y;

        this.context.beginPath();
        this.context.fillStyle = "#FFFFFF"
        this.context.rect(this.x, this.y - PLAYER_DIM.h/2, PLAYER_DIM.w, PLAYER_DIM.h);
        this.context.fill();

        this.ball_collision(ball);
    }
    ball_collision(ball)
    {
        if(
            this.x < ball.getPosX() + PLAYER_DIM.w &&
            this.x + this.w > ball.getPosX() &&
            this.y < ball.getPosY() + PLAYER_DIM.h &&
            this.y + this.h > ball.getPosY()
        )
        {
            ball.collide(this.statsBar, this.x);
        }
    }

}
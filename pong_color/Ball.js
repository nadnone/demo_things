import { C_CENTER, DEFAULT_BALL_SPEED, MAX_SPEED_BALL, PLAYER_DIM, SPEED_BALL_INCREAMENT } from "./constantes.js";

export class Ball
{
    constructor(x,y, context, statsBar)
    {
        this.x = x;
        this.y = y;
        this.h = 20;
        this.w = 20;
        this.angle = 45;
        this.context = context;
        this.running = false;
        this.speed = DEFAULT_BALL_SPEED;
        this.loose = false;
        this.statsBar = statsBar;
    }
    getPosY()
    {
        return this.y;
    }
    getPosX()
    {
        return this.x;
    }
    getSpeed()
    {
        return this.speed;
    }
    collide(statsBar, ennemyX)
    {
        this.x = ennemyX - this.w;

        this.speed += SPEED_BALL_INCREAMENT;

        this.angle = 180 - this.angle;

        statsBar.addPts();
    }
    update(delta_time, player1)
    {
        if (this.running)
        {
            let radAngle = this.angle * Math.PI / 180

            this.x += Math.cos(radAngle) * this.speed * delta_time;
            this.y += Math.sin(radAngle) * this.speed * delta_time;
          
            this.context.beginPath();
            this.context.fillStyle = "#00FF00"
            this.context.rect(this.x, this.y, this.w, this.h);
            this.context.fill();

            this.collide_wall_check(player1)

        }
        else if(!this.running && this.loose)
        {
            this.context.beginPath();
            this.context.fillStyle = "#FF0000";
            this.context.font = "64px Arial Black";
            this.context.fillText("You Loose !", C_CENTER.x/2.5, C_CENTER.y);
            this.context.fill();
        }
        else 
        {
            this.context.beginPath();
            this.context.fillStyle = "#00FF00";
            this.context.font = "45px Arial Black";
            this.context.fillText("Press Spacebar", C_CENTER.x/2.2, C_CENTER.y);
            this.context.fillText("To play !", C_CENTER.x/1.33, C_CENTER.y*1.2);
            this.context.fill();
        }


    }



    collide_wall_check(player1)
    {
        // angle limit
        if(this.angle < -360 || this.angle > 360) this.angle = this.angle % 360;
        if(this.speed > MAX_SPEED_BALL) this.speed = MAX_SPEED_BALL;

        // player1
        if(
            this.x < player1.getPosX() + PLAYER_DIM.w &&
            this.x + this.w > player1.getPosX() &&
            this.y < player1.getPosY() + PLAYER_DIM.h &&
            this.y + this.h > player1.getPosY()
        )
        {

            this.angle = 180 - this.angle;
            this.x = this.w;

        }
        // top 
        if(this.y < this.h)
        {
            this.angle = 360 - this.angle;
            this.y = this.h;
        }
        // bottom
        else if(this.y + this.h > C_CENTER.h)
        {
            this.angle = 360 - this.angle;
            this.y = C_CENTER.h - this.h;
        }
        // right
        else if(this.x + this.w > C_CENTER.w)
        {
            // ca n'arrivera jamais :)
        }
        // left
        if(this.x - this.w < 0)
        {
            this.running = false;
            this.loose = true;
        }


    }

    startGame(x,y){

        this.x = x;
        this.y = y;
        this.speed = DEFAULT_BALL_SPEED;
        this.statsBar.reset();
        this.angle = 45;
        this.running = true;
    }
    getIfRunning()
    {
        return this.running;
    }

}
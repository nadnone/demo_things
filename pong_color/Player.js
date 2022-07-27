import { C_CENTER, PLAYER_DIM } from "./constantes.js";

export class Player {
    constructor(context, x, y){

        context.beginPath();
        context.fillStyle = "#FFFFFF"
        context.rect(x, y, PLAYER_DIM.w, PLAYER_DIM.h);
        context.fill();

        this.velocity_y = 0;
        this.SPEED = 24;
        this.context = context;

        this.posY = C_CENTER.y;
        this.posX = x;
    }


    setPosY(y)
    {
        this.y = y;
    }

    getPosY()
    {
        return this.posY;
    }
    getPosX()
    {
        return this.posX;
    }
    addVelocity(velocity){


        if (velocity > 6 ) velocity = 6;
        else if (velocity < -6) velocity = -6;

        this.velocity_y += velocity;

    }

    update(){




        if (this.posY > C_CENTER.h - PLAYER_DIM.h) 
        {
            this.posY = C_CENTER.h - PLAYER_DIM.h;
            this.velocity_y = 0;
        }
        else if (this.posY < 0) 
        {
            this.posY = 0; 
            this.velocity_y = 0;
        }


        this.posY += this.velocity_y * this.SPEED;

        this.velocity_y = 0;

        this.context.beginPath();
        this.context.fillStyle = "#FFFFFF"
        this.context.rect(this.posX, this.posY, PLAYER_DIM.w, PLAYER_DIM.h);
        this.context.fill();
    }

}
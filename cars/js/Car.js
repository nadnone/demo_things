import { EYE, WORLD } from "./misc.js";

export default class Car
{
    constructor()
    {
        this.pos = {"x": 0, "y": 0};
        this.size = {"w": 60, "h": 120};
        this.center = {"x": this.size.w/2, "y": this.size.h/2}
        this.v = {"x": 0, "y": 0};
        this.friction_force = 0.5;
        this.wheel = -Math.PI/2;
        this.speed = 15 / 1000000;

        // Car texture from https://freesvg.org/red-car-vector-art
        this.img = document.createElement("img");
        this.img.src = "./assets/car.svg";
    }

    draw(ctx)
    {
        ctx.save();

        ctx.beginPath();
        ctx.translate(EYE.c_x, EYE.c_y)
        ctx.rotate(-this.wheel)
        ctx.drawImage(this.img, -this.center.x, -this.center.y, this.size.w, this.size.h);
        ctx.closePath();

        ctx.restore();

    }

    drive_control(input)
    {
        let wheel = 0;

        if (input.isKeyDown("ArrowUp"))
        {
            this.v.y = 1;

        }
        else if (input.isKeyDown("ArrowDown"))
        {
            this.v.y = -1;
        }

        if (input.isKeyDown("ArrowRight"))
        {
            wheel = -0.05;
            this.v.x += 1;
        }
        else if(input.isKeyDown("ArrowLeft"))
        {
            wheel = 0.05;
            this.v.x -= 1;
        }
       


        // moteur :D
        let gas = this.v.y / Math.cos(wheel) + (this.v.y > 0) ? this.speed : 0;
        if (gas > 60) this.gas = 60;
        if (gas < -60) this.gas = -60;


        // boite à vitesse
        if (input.isKeyDown("Digit1"))
        {
            this.speed = 15;
        }
        else if (input.isKeyDown("Digit2"))
        {
            this.speed = 30;
        }
        else if (input.isKeyDown("Digit3"))
        {
            this.speed = 45;
        }
        else if (input.isKeyDown("Digit4"))
        {
            this.speed = 60;
        }

        // freins à main
        if (input.isKeyDown("Space") && gas > 0 )
        {
           gas -= this.speed;             
        }

        // Positions 2D
        this.pos.x += Math.cos(-this.wheel) * gas;
        this.pos.y += Math.sin(-this.wheel) * gas;


        // le volant pour tourner la map à sens inverse
        this.wheel += wheel;


    }

    getData()
    {
        return {"pos": this.pos,"size": this.size, "angle": this.wheel};
    }

};
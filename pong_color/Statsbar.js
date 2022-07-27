import { C_CENTER } from "./constantes.js";

export class StatsBar {
    constructor(context)
    {
        this.context = context;
        this.pts = 0;
    }
    addPts()
    {
        this.pts++;
        console.log(this.pts);
    }
    update(ball)
    {
        this.context.beginPath();
        this.context.fillStyle = "#FFFFFF";
        this.context.font = "18px Arial Black";
        this.context.fillText(`Points: ${this.pts} | Speed: ${ball.getSpeed()}`, 2, 18);
        this.context.fill();
    }
    reset()
    {
        this.pts = 0;
    }
}
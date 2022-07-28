export default class Particle
{
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.lifetime = 255;
    }
    
    
    setPos(x, y)
    {
        this.x += x;
        this.y += y;

        return [this.x, this.y];
    }

}
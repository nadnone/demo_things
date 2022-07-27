import { canvas_H, MAX_PARTICLES as MAX_PARTICLES_H, MAX_SPEED } from "./misc.js";
import Particule from "./Particule.js";

class World
{
    constructor()
    {
        this.particles = [];
    }

    init()
    {
        let middle = parseInt(canvas_H/3);
        for (let x = middle; x < MAX_PARTICLES_H + middle; x++) {
            for (let y = middle; y < MAX_PARTICLES_H + middle; y++) {
                
                let particle = new Particule(x + (y * canvas_H));
                particle.position.x = x;
                particle.position.y = y;
                
                particle.angle = Math.floor(Math.random() * 360) * (180 / Math.PI);

                particle.speed = Math.floor(Math.random() * MAX_SPEED);

                particle.velocity.x = Math.cos(particle.angle) * particle.speed;
                particle.velocity.y = Math.sin(particle.angle) * particle.speed;
                

                this.particles.push(particle);

            }
        }
    }

    animate(ctx)
    {

        for (let i = 0; i < this.particles.length; i++) {

            //particles flow
            let isdead = this.particles[i].animate(ctx, this.particles);

            if (isdead)
            {
                this.particles = this.particles.slice(i, i+1);
            }
            else
            {
                this.particles = this.particles[i].getParticles();
            }


        }

    }
}

export default World;
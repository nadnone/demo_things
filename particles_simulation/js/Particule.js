import { canvas_H, PARTICLE_MASS, MAX_SPEED } from "./misc.js";

class Particule
{
    constructor(m)
    {

        this.matricule = m;

        this.position = {
            "x": 0,
            "y": 0
        };

        this.velocity = {
            "x": 0,
            "y": 0
        };

        this.mass = PARTICLE_MASS;
        this.speed = 0;
        this.particles = [];
        this.angle = 0;


    }
    getBounciness()
    {
        return this.bounciness;
    }

    setVelocity(data = [0,0])
    {
        this.velocity.x = data[0];
        this.velocity.y = data[1];
    } 

    getMatricule() 
    {
        return this.matricule;
    }
    getId()
    {
        return this.m;
    }

    getParticles()
    {
        return this.particles;
    }

    collision(particleB)
    {
        if (
            this.position.x < particleB.position.x + particleB.mass &&
            this.position.x + this.mass > particleB.position.x &&
            this.position.y < particleB.position.y + particleB.mass &&
            this.position.y + this.mass > particleB.position.y
        )
        {
            this.velocity.x -= this.velocity.x - particleB.velocity.x;
            this.velocity.y -= this.velocity.y - particleB.velocity.y;


            return [this.velocity.x, this.velocity.y];
        }

    }

    wallcollide()
    {
       
        if (this.position.x + this.mass > canvas_H) // right wall
        {
            this.position.x = canvas_H - this.mass;
            this.angle = Math.PI - this.angle;
        }
        else if (this.position.x - this.mass < 0) // left wall
        {
            this.position.x = this.mass;
            this.angle = Math.PI - this.angle;
        }
        
        if (this.position.y < this.mass) // top wall
        {
            this.position.y = this.mass;
            this.angle = ( Math.PI * 2 ) - this.angle;
        }
        else if(this.position.y + this.mass > canvas_H) // bottom wall
        {
            this.position.y = canvas_H - this.mass;
            this.angle = ( Math.PI * 2 ) - this.angle;
        }

        this.velocity.x = Math.cos(this.angle) * this.speed;
        this.velocity.y = Math.sin(this.angle) * this.speed;

    }
 
    animate(ctx, particles)
    {

        this.particles = particles;

        // collision check
        this.wallcollide();
        for (let i = 0; i < this.particles.length; i++) {
            this.collision(this.particles[i]);
        }


        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        // drawing
        ctx.beginPath();

        let tmp_speed = this.speed;
        this.speed = Math.sqrt( Math.abs(this.velocity.x**2 + this.velocity.y**2) );
        isNaN(this.speed) ? tmp_speed : this.speed;

        let intensity = (this.speed / MAX_SPEED) * 255;
        
        let ratio = ((this.speed / MAX_SPEED) * 1024) % 100;

        if(ratio > 50) ctx.fillStyle = `rgb(${intensity}, 0, 0)`;
        else if(ratio > 55) ctx.fillStyle = `rgb(${intensity}, ${intensity}, 0)`;
        else if(ratio > 30) ctx.fillStyle = `rgb(${intensity}, ${intensity/2}, ${intensity/3})`;
        else if(ratio < 30) ctx.fillStyle = `rgb(0, 0, ${intensity})`;

        ctx.fillRect(this.position.x, this.position.y, this.mass, this.mass);
        
        ctx.closePath();


    }
}

export default Particule;
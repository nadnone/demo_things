import { HALF_HEIGHT, HALF_WIDTH, HEIGHT, WIDTH } from './constants.js';

export default function projection(obj)
{
    let projection_buffer = [];

    for (let i = 0; i < obj.length; i++) {

     

        for (let j = 0; j < obj[i].length; j++) {


            


            let z0 = obj[i][j][2]; // z
            let x0 = obj[i][j][0]; // x
            let y0 = obj[i][j][1]; // y


            /* Formula from here
                
                https://fr-academic.com/dic.nsf/frwiki/1601667
                https://youtu.be/EqNcqBdrNyI

            */

            const APSECT_RATIO = HEIGHT/WIDTH;
            const FOV = 68.0 * Math.PI / 180
            const HALF_FOV = FOV/2;
            const F = 1 / Math.tan(HALF_FOV);

            const Z_FAR = 10; // Max deep
            const Z_NEAR = 1; // Min deep
            const LAMBDA = Z_FAR / (Z_FAR - Z_NEAR) // scale factore


            let x = APSECT_RATIO * F * x0
            let y = F * y0
            let z = LAMBDA * z0 - Z_NEAR

            x += HALF_WIDTH
            y += HALF_HEIGHT


            projection_buffer.push([x, y, z]);

        


        }




    }

    return projection_buffer;
}

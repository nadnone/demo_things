import { APSECT_RATIO, F, LAMBDA, Z_NEAR } from './constants.js';

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


            const x = APSECT_RATIO * F * x0
            const y = F * y0
            const z = LAMBDA * z0 - Z_NEAR


            projection_buffer.push([x, y, z]);

        


        }




    }

    return projection_buffer;
}

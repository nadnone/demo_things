import { APSECT_RATIO, F, LAMBDA, Z_NEAR } from './constants.js';

export default function projection(obj)
{
    let projection_buffer = [];

    for (let i = 0; i < obj.length; i++) {

     

            let x0 = obj[i][0]; // x
            let y0 = obj[i][1]; // y
            let z0 = obj[i][2];

            /* Formula from here
                
                https://fr-academic.com/dic.nsf/frwiki/1601667
                https://youtu.be/EqNcqBdrNyI

            */


            const x = APSECT_RATIO * F * x0
            const y = F * y0
            const z = LAMBDA * z0 - Z_NEAR


            projection_buffer.push([x, y, z, obj[i][3]]);


        }





    return projection_buffer;
}

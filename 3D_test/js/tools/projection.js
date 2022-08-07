import { CAMERA_Z, HALF_HEIGHT, HALF_WIDTH, SCALE_MAX, SCALE_MIN } from './misc.js';

export default function projection(obj)
{
    let projection_matrice = [];

    for (let i = 0; i < obj.length; i++) {

     

        for (let j = 0; j < obj[i].length; j++) {


            let z =  CAMERA_Z - obj[i][j][2] / 2 ; // z
            let x0 = HALF_WIDTH - obj[i][j][0]; // x
            let y0 = HALF_HEIGHT - obj[i][j][1]; // y

            let x = ((HALF_HEIGHT + (HALF_HEIGHT * SCALE_MIN)) * x0) / z 
            let y = ((HALF_WIDTH + (HALF_WIDTH * SCALE_MAX)) * y0) / z 

            projection_matrice.push([x, y, z]);

        

        }




    }

    return projection_matrice;
}

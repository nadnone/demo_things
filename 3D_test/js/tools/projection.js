import { CAMERA_Z, FOV, HALF_FOV, HALF_HEIGHT, HALF_WIDTH } from './misc.js';

export default function projection(obj)
{
    let projection_matrice = [];

    for (let i = 0; i < obj.length; i++) {

     

        for (let j = 0; j < obj[i].length; j++) {


            let z =  obj[i][j][2] - CAMERA_Z; // z
            let x0 = obj[i][j][0]; // x
            let y0 = obj[i][j][1]; // y
            

            /* Formula from here
                
                https://fr-academic.com/dic.nsf/frwiki/1601667

                I get the tangant angle from the camera to the objet and i use cos ans sin to get the (x,y) coordinates on the 2D plan
            */

            let x = Math.cos(FOV * z) + (x0 + HALF_WIDTH);
            let y = Math.sin(FOV * z) + (y0 + HALF_HEIGHT);


            projection_matrice.push([x, y, z]);

        

        }




    }

    return projection_matrice;
}

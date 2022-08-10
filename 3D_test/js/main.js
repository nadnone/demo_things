
import { ctx, HEIGHT, WIDTH } from './tools/constants.js';
import projection from './tools/projection.js';
import edge_function_method from './tools/edge_function.js';
import drawFunction from './tools/drawFunction.js';

import { cube, colors } from './data/cube.js';

function main()
{


    ctx.clearRect(0,0, WIDTH, HEIGHT);

    // rotation

    const angle = 1 * Math.PI / 180;

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const MATRIX_ROT_X = [
        [1, 0, 0],
        [0, cos, -sin],
        [0, sin, cos]
    ];
    const MATRIX_ROT_Y = [
        [cos, 0, sin],
        [0,  1, 0],
        [-sin, 0, cos]
    ];
    const MATRIX_ROT_z = [
        [cos, -sin, 0],
        [sin, cos, 0],
        [0, 0, 1]
    ];

    let matrice_transform = cube;

    for (let j = 0; j < cube.length; j++) {

        matrice_transform[j] = math.multiply(matrice_transform[j], MATRIX_ROT_X)
        matrice_transform[j] = math.multiply(matrice_transform[j], MATRIX_ROT_Y)
        matrice_transform[j] = math.multiply(matrice_transform[j], MATRIX_ROT_z)
    }


    let projectionMAT = projection(matrice_transform);

    projectionMAT = edge_function_method(projectionMAT, colors);
    

    drawFunction(projectionMAT);



}

//main();
setInterval(main, 30);
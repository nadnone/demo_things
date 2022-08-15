
import { ctx, HEIGHT, WIDTH } from './tools/constants.js';
import projection from './tools/projection.js';
import edge_function_method from './tools/edge_function.js';
import drawFunction from './tools/drawFunction.js';

import { cube, colors } from './data/cube.js';
import { multiply } from './tools/vectors_maths.js';

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
    const MATRIX_ROT_Z = [
        [cos, -sin, 0],
        [sin, cos, 0],
        [0, 0, 1]
    ];

    let matrice_transform = cube;

    for (let j = 0; j < cube.length; j+=3) {

        let buffer = kernel_get(j, matrice_transform);

        buffer = multiply(buffer, MATRIX_ROT_X)
        buffer = multiply(buffer, MATRIX_ROT_Y)
        //buffer = multiply(buffer, MATRIX_ROT_Z)

        for (let k = 0; k < 3; k++) {
            matrice_transform[j+k] = buffer[k]
        }

    }
    

    let matrice_totale = edge_function_method(matrice_transform, colors);

    // projection à la fin sinon ca casse tous
    matrice_totale = projection(matrice_totale);
    drawFunction(matrice_totale);



}

function kernel_get(cursor, matrice)
{
    let m_out = []
    for (let i = cursor; i < cursor + 3; i++) {

        m_out.push(matrice[i]);
    }

    return m_out;
}

//main();
setInterval(main, 60);

import { ctx, HEIGHT, WIDTH } from './tools/constants.js';
import graphics_pipeline from './tools/graphics_pipeline.js';

import { cube, colors } from './data/cube.js';
import { multiply } from './tools/vectors_maths.js';
import { text_printf } from './tools/drawFunction.js';

let i = 45;

async function loop()
{

        ctx.clearRect(0,0, WIDTH, HEIGHT);

        // rotation
    
        let angle = i * Math.PI / 180;
        angle %= Math.PI*2
    
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
    
        let matrice_transform = [];
    
        for (let j = 0; j < cube.length; j+=3) {
    
            let buffer = kernel_get(j, cube);
    
            buffer = multiply(buffer, MATRIX_ROT_Y)
            buffer = multiply(buffer, MATRIX_ROT_X)
            //buffer = multiply(buffer, MATRIX_ROT_Z)
    
            for (let k = 0; k < 3; k++) {
                matrice_transform[j+k] = buffer[k]
            }
    
        }
 
        graphics_pipeline(matrice_transform, colors);

        //i = 45
        i += 4;
        i %= 380;



        text_printf("[!] TODO: Comprendre l'interpolation pour trouver pZ", 300, -400, "#ff0000", 32);
        text_printf("Dernière modification: 13/10/2023 ~22h CEST", 350, -400, "#ffffff", 32);


}

 


function kernel_get(cursor, matrice)
{
    let m_out = []
    for (let i = cursor; i < cursor + 3; i++) {

        m_out.push(matrice[i]);
    }

    return m_out;
}


//loop()
setInterval(loop, 100);
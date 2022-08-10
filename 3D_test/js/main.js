
import { ctx, HEIGHT, WIDTH } from './tools/misc.js';
import projection from './tools/projection.js';
import edge_function_method from './tools/edge_function.js';
import depth_buffer from './tools/depth_buffer.js';

const obj_list = [

    // AVANT
    [
        [-100,   -100,   -100],
        [100,   -100,   -100],
        [-100,   100,   -100]
    ],
    [
        [ -100,   100,   -100],
        [ 100,   -100,   -100],
        [ 100,   100,   -100]
    ],

    // ARRIERE
    [
        [-100,   -100,   100],
        [  100,   -100,   100],
        [ -100,   100,   100]
    ],
    [
        [ -100,   100,   100],
        [  100,   -100,   100],
        [ 100,   100,   100]
    ],

    // BAS
    [
        [-100,   100,   -100],
        [100,   100,   -100],
        [-100,   100,   100]
    ],
    [
        [-100,   100,   100],
        [100,   100,   100],
        [100,   100,   -100]
    ],
    // HAUT
    [
        [-100,   -100,   -100],
        [100,   -100,   -100],
        [-100,   -100,   100]
    ],
    [
        [-100,   -100,   100],
        [100,   -100,   100],
        [100,   -100,  -100]
    ],
    // GAUCHE
    [
        [-100,   -100,   -100],
        [-100,   100,   -100],
        [-100,   -100,   100]
    ],
    [
        [-100,   100,  -100],
        [-100,   100,   100],
        [-100,   -100,   100]
    ],
    // DROITE
    [
        [-100,   -100,   -100],
        [100,   -100,   -100],
        [-100,   -100,    100 ]
    ],
    [
        [100,   -100,   -100],
        [100,   -100,   100],
        [-100,   -100,   100]
    ],
];


let colors_triangles = [
    "#ff0000", 
    "#00ff00", 
    "#0000ff", 
    "#ff00ff", 
    "#ffff00",
    "#00ffff",

];

let i = 0;
let obj = obj_list;




function main()
{

    let depth = depth_buffer();

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

    let matrice_transform = obj;

    for (let j = 0; j < obj_list.length; j++) {

        //matrice_transform[i] = math.multiply(matrice_transform[i], MATRIX_ROT_X)
        matrice_transform[j] = math.multiply(matrice_transform[j], MATRIX_ROT_Y)
        matrice_transform[j] = math.multiply(matrice_transform[j], MATRIX_ROT_z)

    }


    let projectionMAT = projection(matrice_transform);
    
    edge_function_method(projectionMAT, colors_triangles, depth);


    i++;
    i %= 360;

}

//main();
setInterval(main, 60);
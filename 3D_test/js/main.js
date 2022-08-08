
import { ctx, HEIGHT, WIDTH } from './tools/misc.js';
import projection from './tools/projection.js';
import drawer from './tools/drawer.js';

const obj_list = [

    // AVANT
    [
        [-100,   -100,   0],
        [100,   -100,   0],
        [-100,   100,   0]
    ],
    [
        [ -100,   100,   0],
        [ 100,   -100,   0],
        [ 100,   100,   0]
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
        [100,   100,   -100],
        [100,   -100,   -100],
        [100,   100,   100 ]
    ],
    [
        [100,   -100,   -100],
        [100,   -100,   100],
        [100,   100,   100]
    ],
];


let colors_triangles = [
    "#ff0000", "#ff0000",
    "#00ff00", "#00ff00",
    "#0000ff", "#0000ff",
    "#ff00ff", "#ff00ff",
    "#ffff00", "#ffff00",
    "#00ffff", "#00ffff",

];

let i = 0;
let obj = obj_list;

function main()
{

    ctx.clearRect(0,0, WIDTH, HEIGHT);

    // rotation

    const angle = 5 * Math.PI / 180;

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const MATRIX_ROT_X = [
        [1, 0, 0],
        [0,   cos, -sin],
        [0, sin, cos]
    ];
    const MATRIX_ROT_Y = [
        [cos, 0, sin],
        [0,  1, 0],
        [-sin, 0, cos]
    ];



    
    for (let i = 0; i < obj_list.length; i++) {

        obj[i] = math.multiply(obj[i], MATRIX_ROT_X)
        obj[i] = math.multiply(obj[i], MATRIX_ROT_Y)

    }


    let projectionMAT = projection(obj);
    drawer(projectionMAT, colors_triangles);

    i++;
    i %= 360;

}

//main();
setInterval(main, 60);
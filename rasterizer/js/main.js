import bresengan_aglorithm from './bresenham_algo.js';
import scanline_algo from './scanline_algo.js';


let obj_list = [];


// première branche du N
let objet = [
    {"x": 100, "y": 100},
    {"x": 200, "y": 100},
    {"x": 200, "y": 700},
    {"x": 100, "y": 700},

    {"x": 100, "y": 100},
];
obj_list.push(objet);

// diagonale
objet = [
    {"x": 200, "y": 100},
    {"x": 200, "y": 200},
    {"x": 600, "y": 700},
    {"x": 600, "y": 600},

    {"x": 200, "y": 100},
];
obj_list.push(objet);

objet = [
    {"x": 600, "y": 100},
    {"x": 700, "y": 100},
    {"x": 700, "y": 700},
    {"x": 600, "y": 700},

    {"x": 600, "y": 100},
];
obj_list.push(objet);

function main()
{
    for (let i = 0; i < obj_list.length; i++) {
        const objet = obj_list[i];

        let m = bresengan_aglorithm(objet);
        scanline_algo(m);
        
    }



}

main();
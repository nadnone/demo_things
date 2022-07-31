import bresengan_aglorithm from './bresenham_algo.js';
import scanline_algo from './scanline_algo.js';



let objet = [
    {"x": 100, "y": 100},
    {"x": 600, "y": 100},
    {"x": 300, "y": 600},
];


function main()
{
    let m = bresengan_aglorithm(objet);

    scanline_algo(m);

}

main();
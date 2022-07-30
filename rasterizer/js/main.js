import bresengan_aglorithm from './bresenham_algo.js';
import scanline_algo from './scanline_algo.js';



let objet = [
    {"x": 100, "y": 100},
    {"x": 600, "y": 600},
    {"x": 100, "y": 600},

];


function main()
{
    let [mx, my] = bresengan_aglorithm(objet);

    scanline_algo(mx, my);

}

main();
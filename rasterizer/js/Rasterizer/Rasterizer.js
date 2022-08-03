import bresengan_aglorithm from './bresenham_algo.js';
import scanline_algo from './scanline_algo.js';

export default class Rasterizer
{
    constructor(obj_list)
    {
        for (let i = 0; i < obj_list.length; i++) {
            const objet = obj_list[i];
    
            let m = bresengan_aglorithm(objet);
            scanline_algo(m);
            
        }
    }

}
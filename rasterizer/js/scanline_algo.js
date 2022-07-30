import { drawPixel } from './graphics.js';
import bubble_sort_algo from './bubble_sort_algo.js';



export default function scanline_algo(mx, my)
{
    let mdata = bubble_sort_algo(mx, my);


    // TODO a revoir


    for (let i = 0; i < mdata.length; i++) {

        const y = mdata[i].y;

        const x0 = mdata[i].x[0];

        const x1 = mdata[i].x[mdata[i].x.length -1];

        for (let x = x0; x <= x1; x++) {

            drawPixel( {"x": x, "y": y}, {"r": 155, "g": 0, "b": 0}, 6);
            
        }

        console.log(x1);
    }

}

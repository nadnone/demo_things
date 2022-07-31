import { drawPixel } from './graphics.js';
import bubble_sort_algo from './bubble_sort_algo.js';
import { N } from './misc.js';


export default function scanline_algo(m)
{

    let m_sorted = bubble_sort_algo(m);
   
    for (let i = m_sorted.length - 1; i > 0; i--) {

        const x0 = m_sorted[i].x;
        const y0 = m_sorted[i].y;

        let x_list = [];

        for (let k = i; k < m_sorted.length; k++) {

            if (y0 === m_sorted[k].y)
            {
                x_list.push(m_sorted[k].x);
            }
                        
        }

        const x1 = x_list[x_list.length-1];
        

        if (x0 < x1)
        {
            for (let x = x0; x < x1; x++) {

                drawPixel( {"x": x, "y": y0}, {"r": 255, "g": 125, "b": 0}, 10);
            }
        }
        else
        {
            for (let x = x1; x < x0; x++) {

                drawPixel( {"x": x, "y": y0}, {"r": 255, "g": 125, "b": 0}, 10);
            }
        }






    }
}
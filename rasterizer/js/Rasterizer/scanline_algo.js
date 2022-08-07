import { drawPixel } from './graphics.js';
import bubble_sort_algo from './bubble_sort_algo.js';


function binary_search(y0, m)
{
    let r = m.length;
    let l = 0;

    while (l < r) {
        
        let n = parseInt((l + r) / 2);

        if (m[n].y < y0)
        {
            l = n + 1;
        } 
        else r = n;
    }

    return l;
}

export default function scanline_algo(m)
{

    let m_sorted = bubble_sort_algo(m);

    for (let i = 0; i < m_sorted.length; i++) {

        const x0 = m_sorted[i].x;
        const y0 = m_sorted[i].y;

        
        const n = binary_search(y0, m_sorted);
        
        if (n >= m.length) return;

        const x1 = m[n].x;

        if (x0 < x1)
        {
            for (let x = x0; x <= x1; x++) {

                drawPixel( {"x": x, "y": y0}, {"r": 255, "g": 125, "b": 0}, 10);
            }
        }
        else
        {
            for (let x = x1; x <= x0; x++) {

                drawPixel( {"x": x, "y": y0}, {"r": 255, "g": 125, "b": 0}, 10);
            }
        }






    }
}
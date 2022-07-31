import { N } from './misc.js';

function sort_fun(m, j)
{
    const x1 = m[j+1].x;
    const y1 = m[j+1].y;

    const x0 = m[j].x;   
    const y0 = m[j].y;   
    
    let vec;
    
    // swap
    if (x0 > x1)
    {
        vec = {"x": x1, "y": y1};

    }
    else
    {
        vec = {"x": x0, "y": y0};
    }

    return vec;
}

export default function bubble_sort_algo(m)
{

    let m_tmp = [];

    for (let j = 0; j < m.length; j+=2) {

        let vec = sort_fun(m, j);
        m_tmp.push(vec);

    }

    return m_tmp;
}
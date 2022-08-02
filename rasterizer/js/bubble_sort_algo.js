import { N } from './misc.js';

function sort_fun(m, j)
{
    const x1 = m[j+1].x;
    const y1 = m[j+1].y;

    const x0 = m[j].x;   
    const y0 = m[j].y;   
    
    // swap
    if (x0 > x1)
    {
        return {"x": x1, "y": y1};

    }
    else
    {
        return {"x": x0, "y": y0};
    }

}

export default function bubble_sort_algo(m)
{

    let m_tmp = [];

    for (let j = 0; j < m.length - 1; j++) {

        m_tmp.push(sort_fun(m, j));

    }

    return m_tmp;
}
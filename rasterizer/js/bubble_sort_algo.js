function sort_fun(m, j)
{
    const x1 = m[j+1].x;
    const y1 = m[j+1].y;

    const x0 = m[j].x;   
    const y0 = m[j].y;   
    
    let vec;
    
    // swap
    if (x1 < x0)
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

    for (let j = 0; j < m.length - 1; j++) {

        let vec = sort_fun(m, j);
        m_tmp.push(vec);

    }
    let vec = sort_fun(m, m.length - 2);
    m_tmp.push(vec);


    return bubble_sort_extand(m_tmp);

}


function bubble_sort_extand(m)
{
    let y0 = m[0].y;

    let same_y = [];
    let data = [];

    
    for (let i = 0; i < m.length; i++) {

        const y = m[i].y;


        if (y0 < y)
        {
            same_y.push({"x": data, "y": y});
        }
        else
        {
            data.push(m[i].x);
            y0 = y;
        }


    }

    return same_y;
}
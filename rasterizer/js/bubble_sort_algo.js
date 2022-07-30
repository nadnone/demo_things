export default function bubble_sort_algo(mx, my)
{
    let m = [];

    for (let j = 0; j < my.length; j++) {

        const x0 = mx[j];   
        const x1 = mx[j+1];

        const y0 = my[j];   
        const y1 = my[j+1];
        
        let vec;
        
        // swap
        if (y1 < y0)
        {
            vec = {"x": x1, "y": y1};

        }
        else
        {
            vec = {"x": x0, "y": y0};
        }


        m.push(vec)


    }
    
    return bubble_sort_extand(m);

}


function bubble_sort_extand(m)
{
    let y0 = m[0].y;

    let same_y = [];
    let data = [];

    for (let i = 0; i < m.length; i++) {
        const y = m[i].y;


        if (y === y0)
        {
            data.push(m[i].x);
        }
        else
        {
            y0 = y;
            same_y.push({"x": data, "y": y});
        }

    }

    return same_y;
}
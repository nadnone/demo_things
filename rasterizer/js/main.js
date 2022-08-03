
import Rasterizer from './Rasterizer/Rasterizer.js';

let obj_list = [
    // première branche du N
    [
        {"x": 100, "y": 100},
        {"x": 200, "y": 100},
        {"x": 200, "y": 700},
        {"x": 100, "y": 700},
    ],
    // diagonale
    [
        {"x": 200, "y": 100},
        {"x": 200, "y": 300},
        {"x": 600, "y": 700},
        {"x": 600, "y": 500},

    ],
    // dérnière branche du N
    [
        {"x": 600, "y": 100},
        {"x": 700, "y": 100},
        {"x": 700, "y": 700},
        {"x": 600, "y": 700},

    ]
]

function main()
{
   
    new Rasterizer(obj_list);

}

main();
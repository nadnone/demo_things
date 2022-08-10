import { HEIGHT, WIDTH } from "./misc.js";

export default function depth_buffer()
{
    let depth = []

    for (let i = 0; i < WIDTH*HEIGHT ; i++) 
    {
            depth.push(Infinity);
    }

    return depth;
}
import { ctx, HEIGHT, WIDTH } from "./constants.js";


export default class depth_buffer
{
    constructor()
    {
        this.depth = [];

        for (let i = 0; i < WIDTH*HEIGHT ; i++) 
        {
                this.depth.push(Infinity);
        }
    }

    depth_check(matrice)
    {
        let m_out = [];
        for (let i = 0; i < matrice.length; i++) {
            
            if (this.depth[i] > matrice[i][2])
            {
                this.depth[i] = matrice[i][2]
                m_out.push(matrice[i]);

            }

        }



        return m_out;
    }
}

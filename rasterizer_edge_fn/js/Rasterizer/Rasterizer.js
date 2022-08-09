import edge_function_method from './edge_function.js';

export default class Rasterizer
{
    constructor(obj_list)
    {
        for (let i = 0; i < obj_list.length; i++) {
            const objet = obj_list[i];
    
            edge_function_method(objet);

        }
    }

}
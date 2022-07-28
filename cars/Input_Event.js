export default class Input_Event 
{
    constructor()
    {
        this.input_key = "";

        addEventListener("keydown", (event) => { 
            this.input_key = event.code;
            console.log(event.code);
        });
    }

    isKeyDown(key)
    {
        if (key === this.input_key) return 1;
        else return 0;
    }

}
import { PLAYER_DIM } from "./constantes.js";

function InitkeyboardEvent(player1, player2, ball)
{
    addEventListener("keydown", (event) => {

        if (event.key === "W" || event.key === "w" || event.key === "ArrowUp")
        {
            player1.addVelocity(-1);
        }
        if (event.key === "S" || event.key === "s" || event.key === "ArrowDown")
        {
            player1.addVelocity(1);
        }

        if (event.key === " ")
        {
            ball.startGame(PLAYER_DIM.w + 10, player1.getPosY() + PLAYER_DIM.h/2);
        }

    });
}

export { InitkeyboardEvent }

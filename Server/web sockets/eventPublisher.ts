import { Games } from "..";

export function broadcastToAllPlayers(gameCode: string, message: unknown){
    const currentGame = Games.get(gameCode);

    if(!currentGame){
        return;
    }

    const players = currentGame.getPlayers();

    //send message to all the players
    players.forEach(player => {
        player.webSocket.send(JSON.stringify({
            type: 'message',
            data: message,
        }))
    });
}

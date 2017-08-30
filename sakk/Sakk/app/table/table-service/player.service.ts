import { Injectable, Inject } from '@angular/core';
import { UtilService } from '../../util/util.service';

@Injectable()
export class PlayerService {
    private playerList : Array<Player> = new Array<Player>();
    private self : Player;

    public constructor(
        @Inject(UtilService) private utilService : UtilService
    ){}

    public createNewPlayer(username : string) : string {
        let player : Player = new Player(this.utilService.uuidv4(), username, 1200); 
        this.playerList.push (player);
        return player.id;
    }

    public getPlayerByUUID(uuid : string) : Player{
        return this.playerList.filter(player => {return player.id == uuid;})[0];
    }

    public setCurrentPlayerByUUID(uuid : string) : void {
        this.self = this.getPlayerByUUID(uuid);
    }

    public getCurrentPlayer() : Player {
        return this.self;
    }

}

export class Player {

    public constructor(
        public id : string,
        public username : string,
        public elo : number
    ){}
}
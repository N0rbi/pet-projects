import { Component } from '@angular/core';
import { GameService } from '../table/table-service/game.service';
import { GameInstanceService, GameInstance } from '../table/table-service/game.instance.service';
import { Player, PlayerService } from '../table/table-service/player.service';

@Component({
    moduleId: module.id,
    selector: 'side-panel',
    templateUrl: './side-panel.component.html',
    styleUrls: ['./side-panel.component.css'],
})
export class SidePanelComponent {
    private self : Player = null;

    public constructor(
        private gameService : GameService,
        private gameInstanceService : GameInstanceService,
        private playerService : PlayerService
    ) {}

    private getEnemy() : string {
        this.self = this.playerService.getCurrentPlayer();
        let selfColor : number = this.gameInstanceService.getCurrentGame().getPlayerColor(this.self);
        let enemy : Player = null;
        if (selfColor == GameInstance.DARK){
            enemy = this.gameInstanceService.getCurrentGame().getLightPlayer();
        } else {
            enemy = this.gameInstanceService.getCurrentGame().getDarkPlayer();
        }
        return enemy.username;
    }

    public getNextPlayer() : string {
        return this.gameInstanceService.getCurrentGame().isPlayersTurn(this.self) ? "YOUR" : "ENEMY";
    }


}
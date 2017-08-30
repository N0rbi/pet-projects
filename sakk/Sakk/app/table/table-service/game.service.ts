import { Injectable, Inject } from '@angular/core';
import { PlayerService, Player } from './player.service';
import { GameInstance, GameInstanceService, FigureSet } from './game.instance.service';
import { GameMasterService, GameStatus } from './game-master.service';
import { Figure } from '../figure/figure.model';

@Injectable()
export class GameService {

    private currentPlayer : Player;
    private currentGame : GameInstance;

    private isOffline : boolean = true;

    private player1 : Player;
    private player2 : Player;
    
    public constructor(
        @Inject(GameInstanceService) private gameInstanceService : GameInstanceService,
        @Inject(GameMasterService) private gameMasterService : GameMasterService,
        @Inject(PlayerService) private playerService : PlayerService
    ){
        this.player1 = this.playerService.getPlayerByUUID(
            this.playerService.createNewPlayer('adorján')
        );

        this.player2 = this.playerService.getPlayerByUUID(
            this.playerService.createNewPlayer('adorján')
        );

        this.playerService.setCurrentPlayerByUUID(this.player1.id);

        this.gameInstanceService.setCurrentGameByUUID(
            this.gameInstanceService.createNewGame(this.player1,this.player2)
        );
        
        this.currentGame = this.gameInstanceService.getCurrentGame();
        this.currentPlayer = this.player1;
    }

    private changePlayerInCharge() : void {
        this.currentPlayer = (this.currentPlayer == this.player1) ? this.player2 : this.player1;
    }

    public moveFigure(f : Figure, x :number, y : number) : boolean {
        if (!f || f.x == x && f.y == y) {
            return false;
        }
        let moved = f.moveTo(x,y, this.currentGame.getFigures().getHitmap());
        if (!moved) {
            return false;
        }
        if (this.isPlayerInCheck()) {
            f.undoMove();
            return false;
        }
        return true;
    }

    public isFigureMovable(f : Figure) : boolean {
        if(!f) {
            return false;
        }
        return this.getHintedCells(f).length > 0 && 
        this.currentGame.isPlayersTurn(this.currentPlayer) && f.color == this.currentGame.getPlayerColor(this.currentPlayer);
    }

    public isPlayerInCheck() : boolean {
        return this.gameMasterService.isValidStatus(this.currentGame);
    }

    public getHintedCells(f : Figure) : Array<any> {
        if (!f) {
            return null;
        }
        return this.gameMasterService.getAllowedMoves(this.gameInstanceService.getCurrentGame(), f);
    }

    /*
        Ends the turn, returns what status the game is currently in.
    */
    public endTurn() : number {
        debugger;
        let status = this.gameMasterService.getGameStatus(this.currentGame);
        if (status == GameStatus.OK) {
            this.currentGame.switchCurrentPlayerColor();
            if (this.isOffline) {
                this.changePlayerInCharge();
            }
        }
        return status;
    }

    public getFigures() : Array<Figure> {
        return this.currentGame.getFigures().getTable();
    }

    public enemyTurn() : boolean {
        return !this.currentGame.isPlayersTurn(this.currentPlayer);
    }

}
import { Injectable, Inject } from '@angular/core';
import { GameInstance, FigureSet } from './game.instance.service';
import { King } from '../figure/king.model';
import { Figure } from '../figure/figure.model';

@Injectable()
export class GameMasterService {

    public isValidStatus(gameInstance : GameInstance) : boolean {
        return this.getCurrentKing(gameInstance).isChess();
    }
    
    public getGameStatus(gameInstance : GameInstance) : number {
        let currentKing : King = this.getCurrentKing(gameInstance);
        let canMove = this.seekPossibleMoves(gameInstance);
        if (canMove) {
            return GameStatus.OK;
        }
        let isPlayerLight = gameInstance.getCurrentPlayerColor() == GameInstance.LIGHT;
        if (currentKing.isChess()) {
            return (isPlayerLight ? GameStatus.DARK_VICTORY : GameStatus.LIGHT_VICTORY);
        }
        return isPlayerLight ? GameStatus.DARK_DRAWED : GameStatus.LIGHT_DRAWED;
    }

    private getCurrentFigures(gameInstance : GameInstance) : Array<Figure> {
        return (gameInstance.getCurrentPlayerColor() == GameInstance.LIGHT) ? 
        gameInstance.getFigures().getLightFigures():
        gameInstance.getFigures().getDarkFigures();
    } 

    private getCurrentKing(gameInstance : GameInstance) : King {
        let figures : Array<Figure> = this.getCurrentFigures(gameInstance);
        return figures.filter(f => {return f instanceof King})[0] as King;
    }

    private seekPossibleMoves(gameInstance : GameInstance) : boolean {
        let currentKing = this.getCurrentKing(gameInstance);
        let map = gameInstance.getFigures().getHitmap();
        let currentFigures : Array<Figure> = this.getCurrentFigures(gameInstance);
            for (let f of currentFigures) {
                console.log(f);
                if(this.getAllowedMoves(gameInstance, f).length > 0) {
                    return true;
                }
            }
        return false;
    }

    public getAllowedMoves(gameInstance : GameInstance, figure : Figure) : Array<any> {
        let currentKing = this.getCurrentKing(gameInstance);
        let map = gameInstance.getFigures().getHitmap();
        let ret : Array<any> = Array<any>();
        for (let move of figure.possibleMoves(map)) {
            if(move.type == "allowed") {
                figure.moveTo(move.x, move.y, map);
                if (!currentKing.isChess()){
                    ret.push({
                        x: figure.x,
                        y: figure.y,
                        type: "allowed"
                    });
                }
                figure.undoMove();
            }
        }
        return ret;
    }
}

export class GameStatus {
    public static DARK_VICTORY : number = -2;
    public static DARK_DRAWED : number = -1;
    public static OK : number = 0;
    public static LIGHT_DRAWED : number = -1;
    public static LIGHT_VICTORY : number = -2;
    
}
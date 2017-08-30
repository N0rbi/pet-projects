import { Injectable } from '@angular/core';
import { Player } from './player.service';
import { UtilService } from '../../util/util.service';

import { Figure } from '../figure/figure.model';
import { Pawn } from '../figure/pawn.model';
import { King } from '../figure/king.model';
import { Queen } from '../figure/queen.model';
import { Bishop } from '../figure/bishop.model';
import { Knight } from '../figure/knight.model';
import { Rook } from '../figure/rook.model';

@Injectable()
export class GameInstanceService {


    private games : Array<GameInstance> = new Array<GameInstance>();
    private currentGame : GameInstance;
    public constructor(
        private utilService : UtilService
    ) {}

    public createNewGame(player1 : Player, player2 : Player) : string {
        let instance = new GameInstance(player1, player2, this.utilService);
        this.games.push(instance);
        return instance.getUUID();
    }

    public getCurrentGame() : GameInstance {
        return this.currentGame;
    }

    public setCurrentGameByUUID(uuid : string) {
        this.currentGame = this.games.filter( game=> {return game.getUUID() == uuid })[0];
    }

    public listGames() : Array<GameInstance> {
        return this.games;
    }
}

export class GameInstance {

    public static LIGHT = 1;
    public static DARK = -1;
    private uuid : string = this.utilService.uuidv4();
    private figures : FigureSet = new FigureSet(this.utilService);
    private currentPlayer : number = GameInstance.LIGHT;
    public constructor(
        private lightPlayer : Player,
        private darkPlayer : Player,
        private utilService : UtilService
    ){}

    public getUUID() : string {
        return this.uuid;
    }

    public isPlayersTurn(player : Player) {
        return this.currentPlayer == this.getPlayerColor(player);
    }

    public getCurrentPlayerColor() : number {
        return this.currentPlayer;
    }

    public switchCurrentPlayerColor() : void {
        this.currentPlayer = -this.currentPlayer;
    }

    public getPlayerColor(p : Player) : number {
        return p == this.lightPlayer ? GameInstance.LIGHT : GameInstance.DARK;
    }

    public getLightPlayer() : Player {
        return this.lightPlayer;
    }

    public getDarkPlayer() : Player {
        return this.darkPlayer;
    }

    public getFigures() : FigureSet {
        return this.figures;
    }
}

export class FigureSet {
    private lightFigures = Array<Figure>();
    private lightDeads = Array<Figure>();
    private darkFigures = Array<Figure>();
    private darkDeads =  Array<Figure>();

    public constructor(private utilService : UtilService){
        let whitePawns = 2;
        let whiteMajors = 1;
        let blackPawns = 7;
        let blackMajors = 8;

        for(var i=1; i<=8; i++) {
            this.lightFigures.push(new Pawn(GameInstance.LIGHT, i, whitePawns, this));
            this.darkFigures.push(new Pawn(GameInstance.DARK, i, blackPawns, this));
        }

        // White majors
        this.lightFigures.push(new Rook(GameInstance.LIGHT, 1, whiteMajors, this));
        this.lightFigures.push(new Rook(GameInstance.LIGHT, 8, whiteMajors, this));
        this.lightFigures.push(new Knight(GameInstance.LIGHT, 2, whiteMajors, this));
        this.lightFigures.push(new Knight(GameInstance.LIGHT, 7, whiteMajors, this));
        this.lightFigures.push(new Bishop(GameInstance.LIGHT, 3, whiteMajors, this));
        this.lightFigures.push(new Bishop(GameInstance.LIGHT, 6, whiteMajors, this));
        this.lightFigures.push(new Queen(GameInstance.LIGHT, 4, whiteMajors, this));
        this.lightFigures.push(new King(GameInstance.LIGHT, 5, whiteMajors, this));

        // Black majors
        this.darkFigures.push(new Rook(GameInstance.DARK, 1, blackMajors, this));
        this.darkFigures.push(new Rook(GameInstance.DARK, 8, blackMajors, this));
        this.darkFigures.push(new Knight(GameInstance.DARK, 2, blackMajors, this));
        this.darkFigures.push(new Knight(GameInstance.DARK, 7, blackMajors, this));
        this.darkFigures.push(new Bishop(GameInstance.DARK, 3, blackMajors, this));
        this.darkFigures.push(new Bishop(GameInstance.DARK, 6, blackMajors, this));
        this.darkFigures.push(new Queen(GameInstance.DARK, 4, blackMajors, this));
        this.darkFigures.push(new King(GameInstance.DARK, 5, blackMajors, this));
    }

    public getTable() : Array<Figure> {
        return this.darkFigures.concat(this.lightFigures);
    }

    public getLightFigures() : Array<Figure> {
        return this.lightFigures;
    }

    public getDarkFigures() : Array<Figure> {
        return this.darkFigures;
    }

     public killFigure (x : number, y : number) : Figure {
        let killed : Figure = null;
        
        for (let f of this.getTable()) {
            if (f.x == x && f.y == y) {
                killed = f;
                break;
            }
        }

        if (killed == null) {
            return killed;
        }

        if (this.utilService.removeItemFromArray(this.darkFigures, killed)) {
            this.darkDeads.push(killed);
        } else {
            this.utilService.removeItemFromArray(this.lightFigures, killed);
            this.lightDeads.push(killed);
        }

        return killed;
    }

    public reviveFigure(killed : Figure) : void {
        if (killed == null) {
            return;
        }

        if (this.utilService.removeItemFromArray(this.darkDeads, killed)) {
            this.darkFigures.push(killed);
        } else if (this.utilService.removeItemFromArray(this.lightDeads, killed)){
            this.lightFigures.push(killed);
        }
    }

    public getHitmap() : Array<Array<number>> {
        let array = new Array<Array<number>>();
        for (let i = 0; i < 8; i++) {
            array.push(new Array<number>());
        }
        this.getTable().map(f => {
            return f.color == GameInstance.LIGHT ? {x: f.x-1, y: f.y-1, c: 1} : {x: f.x-1, y: f.y-1, c: -1};
        }).forEach(item => {
            array[item.x][item.y] = item.c;
        });
        return array;
    }

    public shortRook(color : number) : boolean {
        let rookMoved : boolean = false;
        let col = (color == GameInstance.LIGHT) ? 1 : 8;
        let figs = (color == GameInstance.LIGHT) ? this.lightFigures : this.darkFigures;
        for (let f of figs) {
            if (f instanceof Rook && f.firstMove == true && f.x == 8) {
                rookMoved = f.moveTo(6, col, this.getHitmap());
                (f as Rook).rooked = true;
            }
        }
        return rookMoved;
    }
    
    public longRook(color : number) : boolean {
        let rookMoved : boolean = false;
        let col = (color == GameInstance.LIGHT) ? 1 : 8;
        let figs = (color == GameInstance.LIGHT) ? this.lightFigures : this.darkFigures;
        for (let f of figs) {
            if (f instanceof Rook && f.firstMove == true && f.x == 1) {
                rookMoved = f.moveTo(4, col, this.getHitmap());
                (f as Rook).rooked = true;                
            }
        }
        return rookMoved;
    }

    public unRook(color : number) :void {
        let col = (color == GameInstance.LIGHT) ? 1 : 8;
        let figs = (color == GameInstance.LIGHT) ? this.lightFigures : this.darkFigures;
        for (let f of figs) {
            if (f instanceof Rook) {
                let rook : Rook = f as Rook;
                if (rook.rooked) {
                    rook.undoMove();
                    rook.rooked = false;
                }
            }
        }
    }

    public isChess(color, x, y) : boolean {
        let enemies = color == GameInstance.LIGHT ? this.darkFigures : this.lightFigures;
        let ret = false;
        enemies.forEach(fig => {
            fig.possibleMoves(this.getHitmap()).forEach(moves => {
                if (x == moves.x && y == moves.y) {
                    ret = true;
                }
            });
        });
        return ret;
    }
}
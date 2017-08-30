import { Injectable } from '@angular/core';

import { Figure } from '../figure/figure.model';
import { Pawn } from '../figure/pawn.model';
import { King } from '../figure/king.model';
import { Queen } from '../figure/queen.model';
import { Bishop } from '../figure/bishop.model';
import { Knight } from '../figure/knight.model';
import { Rook } from '../figure/rook.model';

@Injectable()  
export class TableService {

    private color : String;

    private lights : Array<Figure> = new Array<Figure>();
    private lightKing : King;
    private darks : Array<Figure> = new Array<Figure>();
    private darkKing : King;
    private lightGraveyard : Array<Figure> = new Array<Figure>();
    private darkGraveyard : Array<Figure> = new Array<Figure>();

    private currentPlayer : String = "white";

    constructor () {
        // this.setupTable();
    }

    // private setupTable() : void {
    //     let whitePawns = 2;
    //     let whiteMajors = 1;
    //     let blackPawns = 7;
    //     let blackMajors = 8;

    //     for(var i=1; i<=8; i++) {
    //         this.lights.push(new Pawn("white", i, whitePawns, this));
    //         this.darks.push(new Pawn("black", i, blackPawns, this));
    //     }

    //     // White majors
    //     this.lights.push(new Rook("white", 1, whiteMajors, this));
    //     this.lights.push(new Rook("white", 8, whiteMajors, this));
    //     this.lights.push(new Knight("white", 2, whiteMajors, this));
    //     this.lights.push(new Knight("white", 7, whiteMajors, this));
    //     this.lights.push(new Bishop("white", 3, whiteMajors, this));
    //     this.lights.push(new Bishop("white", 6, whiteMajors, this));
    //     this.lights.push(new Queen("white", 4, whiteMajors, this));
    //     this.lightKing = new King("white", 5, whiteMajors, this);
    //     this.lights.push(this.lightKing);

    //     // Black majors
    //     this.darks.push(new Rook("black", 1, blackMajors, this));
    //     this.darks.push(new Rook("black", 8, blackMajors, this));
    //     this.darks.push(new Knight("black", 2, blackMajors, this));
    //     this.darks.push(new Knight("black", 7, blackMajors, this));
    //     this.darks.push(new Bishop("black", 3, blackMajors, this));
    //     this.darks.push(new Bishop("black", 6, blackMajors, this));
    //     this.darks.push(new Queen("black", 4, blackMajors, this));
    //     this.darkKing = new King("black", 5, blackMajors, this);
    //     this.darks.push(this.darkKing);
    // }

    public setPlayerColor(color : String) : void {
        this.color = color;
    }
    
    public getAllFigures() : Array<Figure> {
        return this.lights.concat(this.darks);
    }

    public getHitmap() : Array<Array<number>> {
        var result = [];

        var figures = this.getAllFigures();

        for(var i=0; i<8; i++) {
            result.push(new Array<number>(8));
            for(var j=0; j<8; j++) {
                figures.forEach(fig => {
                    if(fig.x-1 == i && fig.y-1 == j) {
                        // result[i][j] = fig.color == "white" ? 1 : -1;
                    }
                });
            }
        }

        return result;
    }

    /**
     * returns 0 if the game is not over, 1 or -1 according to which player won, 
     * 2 or -2 according to which player had no move free moves. 3 or -3 on chess.
     */
    public getGameStatus() : number {
        // let currentKing : King = this.getCurrentPlayer() == "white" ? this.lightKing.isChess() : this.darkKing.isChess();
        let currentKing : King = null;
        if(this.getCurrentPlayer() == "white") {
            currentKing = this.lightKing;
        } else {
            currentKing = this.darkKing;
        }
        if (currentKing.isChess()) {
            // if its a check we see if its a mate
            let currentFigures : Array<Figure> = null;
            if (this.getCurrentPlayer() == "white") {
                currentFigures = this.lights;
            } else {
                currentFigures = this.darks;
            }

            let map = this.getHitmap();
            for (let f of currentFigures) {
                for (let move of f.possibleMoves(map)) {
                    if(move.type == "allowed") {
                        f.moveTo(move.x, move.y, map);
                        if (!currentKing.isChess()){
                            f.undoMove();
                            return 3 * (this.getCurrentPlayer() == "white" ? 1 : -1);
                        }
                        f.undoMove();
                    }
                }
            }

            return (this.getCurrentPlayer() == "white" ? 1 : -1);
        }

        return 0;
    }

    public isPlayersTurn() : boolean {
        return false;
    }

    public killFigure(x : number, y : number) : Figure {
        let index = -1;
        let killed : Figure = null;
        if (this.getCurrentPlayer() == "black") {
            this.lights.forEach(fig => {
            if (fig.x == x && fig.y == y) {
                index = this.lights.indexOf(fig);
                this.lightGraveyard.push(fig);
            }
        });
        if(index >= 0) {
            killed = this.lights[index];
            this.lights.splice(index, 1);
        }
        } else {
            this.darks.forEach(fig => {
                if (fig.x == x && fig.y == y) {
                    index = this.darks.indexOf(fig);
                    this.darkGraveyard.push(fig);
                }
            });
            if(index >= 0) {
                killed = this.darks[index];
                this.darks.splice(index, 1);
            }
        }
        return killed;
    }

    public reviveFigure(fig : Figure) : void {
        if (!fig) {
            return;
        }
        let index = -1;
        this.lightGraveyard.forEach(f => {
            if (f == fig) {
                index = this.lightGraveyard.indexOf(f);
                this.lights.push(f);                
            }
        });
        if (index >= 0) {
            this.lightGraveyard.splice(index, 1);
        } else {
           this.darkGraveyard.forEach(f => {
                if (f == fig) {
                    index = this.darkGraveyard.indexOf(f);
                    this.darks.push(f);
                }
            });
            if (index >= 0) {
                this.darkGraveyard.splice(index, 1);
            }
        }
    }

    public getCurrentPlayer() : String {
        return this.currentPlayer;
    }

    public switchCurrentPlayer() : void {
        this.currentPlayer = this.currentPlayer == "white" ? "black" : "white";
    }

    public shortRook(color : String) : boolean {
        let rookMoved : boolean = false;
        if (color == "white") {
            this.lights.forEach(fig => {
                if (fig instanceof Rook && fig.x == 8) {
                    if (fig.firstMove) {                    
                        rookMoved = fig.moveTo(6, 1, this.getHitmap());
                    }
                }
            });
        } else {
            this.darks.forEach(fig => {
                if (fig instanceof Rook && fig.x == 8) {
                    if (fig.firstMove) {
                        rookMoved = fig.moveTo(6, 8, this.getHitmap());
                    }                    
                }
            });
        }
        return rookMoved;
    }
    
    public longRook(color : String) : boolean {
        let rookMoved : boolean = false;
        if (color == "white") {
            this.lights.forEach(fig => {
                if (fig instanceof Rook && fig.x == 1) {
                    if (fig.firstMove) {
                        rookMoved = fig.moveTo(4, 1, this.getHitmap());
                    }                    
                }
            });
        } else {
            this.darks.forEach(fig => {
                if (fig instanceof Rook && fig.x == 1) {
                    if (fig.firstMove) {
                        rookMoved = fig.moveTo(4, 8, this.getHitmap());
                    }
                }
            });
        }
        return rookMoved;
    }

    public isChess(color, x, y) : boolean {
        let enemies = color == "white" ? this.darks : this.lights;
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
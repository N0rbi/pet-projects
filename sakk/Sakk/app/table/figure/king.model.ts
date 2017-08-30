import { Figure, Memento } from './figure.model';
import { FigureSet, GameInstance } from '../table-service/game.instance.service';
import { Stack } from '../../stack';


export class King extends Figure {

    private rooked : Stack<boolean> = new Stack<boolean>();

    constructor(color : number, x : number, y : number, game : FigureSet) {
        super("King", Number.POSITIVE_INFINITY , color, x, y, game);
    }

    public possibleMoves(map) : Array<any> {
        let ret = [];
        for(var i= Math.max(1, this.x-1); i<= Math.min(8, this.x+1); i++){
            for(var j= Math.max(1, this.y-1); j<= Math.min(8, this.y+1); j++){
                if(i==this.x && j==this.y) {
                    ret.push({x: i, y: j, type: "no-move"});
                    continue;
                } else if (map[i-1][j-1] == 1){
                    ret.push({x: i, y: j, type: this.color==GameInstance.LIGHT ? "disallowed" : "allowed"});
                    continue;
                } else  if (map[i-1][j-1] == -1){
                    ret.push({x: i, y: j, type: this.color==GameInstance.LIGHT ? "allowed" : "disallowed"});
                    continue;    
                } else {
                    ret.push({x: i, y: j, type: "allowed"});
                }
            }
            if (this.firstMove) {
                ret.push({x: this.x-2, y: this.y, type: (map[this.x-2][this.y-1] || map[this.x-3][this.y-1]) ? "disallowed" : "allowed"});
                ret.push({x: this.x+2, y: this.y, type: (map[this.x][this.y-1] || map[this.x+1][this.y-1]) ? "disallowed" : "allowed"});
            }
        }
        return ret;
    }

    public moveTo(x,y,map) : boolean {
        let dX = this.x-x;
        let validMove = false;
        this.possibleMoves(map).forEach(move => {
            if (move.x == x && move.y == y && move.type == "allowed") {
                validMove = true;
            }
        });
        if (!validMove) {
            this.rooked.push(false);
            return false;
        }        
        if (Math.abs(dX) == 2) {
            if (this.isChess()) {
                this.rooked.push(false);                
                return;
            }
            let rookMoved : boolean = false;
            if (dX < 0) {
                if (this.game.isChess(this.color, this.x+1, this.y) ||
                 this.game.isChess(this.color, this.x+2, this.y)){
                    this.rooked.push(false);
                    
                    return;
                }
                this.game.shortRook(this.color);
                this.rooked.push(true);
            } else {
                if (this.game.isChess(this.color, this.x+1, this.y) ||
                 this.game.isChess(this.color, this.x+2, this.y) ||
                  this.game.isChess(this.color, this.x+3, this.y)){
                    this.rooked.push(false);                 
                    return;
                }
                this.game.longRook(this.color);
                this.rooked.push(true);
            }
        } else {
            this.rooked.push(false);                                 
        }
        let memento : Memento = new Memento();
        memento.x = this.x;
        memento.y = this.y;
        memento.firstMove = this.firstMove;
        memento.killed = this.game.killFigure(x,y);        
        this.mementos.push(memento);
        this.x = x;
        this.y = y;

        this.firstMove = false;
        return true;
    }

    public isChess() : boolean {
        return this.game.isChess(this.color, this.x, this.y);
    }

    public undoMove() : void {
        if(!this.rooked.isEmpty()) {
            if (this.rooked.pop()) {
                this.game.unRook(this.color);
            }
        }
        super.undoMove();
    }
}
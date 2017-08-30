import { Figure } from './figure.model';
import { FigureSet, GameInstance } from '../table-service/game.instance.service';

export class Pawn extends Figure {

    constructor(color : number, x : number, y : number, game : FigureSet) {
        super("Pawn", 1, color, x, y, game);
    }

    public possibleMoves(map) : Array<any> {
        let pawnDirection = this.color == GameInstance.LIGHT ? 1 : -1;
        let ret = Array<any>();
        ret.push({x: this.x, y: this.y, type: "no-move"});
        for(var i = Math.max(1,this.x-1); i <= Math.min(8, this.x+1); i++) {
            if(i == this.x) {
                ret.push({x:i, y: this.y+pawnDirection, type: (map[i-1][this.y+pawnDirection-1]) ? "disallowed" : "allowed"});
            } else {
                let enemyColor = this.color == GameInstance.LIGHT ? -1 : 1;
                if (map[i-1][this.y+pawnDirection-1] == enemyColor) {
                    ret.push({x:i, y: this.y+pawnDirection, type: "allowed"});
                }
            }
        }
        if (this.firstMove) {
            ret.push({x:this.x, y: this.y+pawnDirection*2, type: (map[this.x-1][this.y+pawnDirection-1] || map[this.x-1][this.y+pawnDirection*2-1]) ? "disallowed" : "allowed"});
        }
        return ret;
    }
}
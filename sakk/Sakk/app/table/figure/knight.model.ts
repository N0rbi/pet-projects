import { Figure } from './figure.model';
import { TableService } from '../table-service/table.service';
import { FigureSet, GameInstance } from '../table-service/game.instance.service';

export class Knight extends Figure {

    constructor(color : number, x : number, y : number, game : FigureSet) {
        super("Knight", 3, color, x, y, game);
    }

    public possibleMoves(map) : Array<any> {
        let ret = Array<any>();
        for (var i = Math.max(1, this.x-2); i <= Math.min(8, this.x+2); i++) {
            for (var j = Math.max(1, this.y-2); j <= Math.min(8, this.y+2); j++) {
                let distance = Math.abs(this.x - i) + Math.abs(this.y - j);
                if (distance == 3) {
                    let ownColor = this.color == GameInstance.LIGHT ? 1 : -1;
                    ret.push({x: i, y: j, type: map[i-1][j-1] != ownColor ? "allowed" : "disallowed"});
                }
            }
        }
        ret.push({x: this.x, y: this.y, type: "no-move"});
        return ret;
    }
}
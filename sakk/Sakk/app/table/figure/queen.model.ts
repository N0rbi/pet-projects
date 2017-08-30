import { Figure } from './figure.model';
import { Rook } from './rook.model';
import { Bishop } from './bishop.model';
import { FigureSet, GameInstance } from '../table-service/game.instance.service';
import { Stack } from '../../stack';

export class Queen extends Figure {

    private rook : Rook;
    private bishop : Bishop;
    private figureMoved : Stack<Figure> = new Stack<Figure>();

    constructor(color : number,  x : number, y : number, game : FigureSet) {
        super("Queen", 9, color, x, y, game);
        this.rook = new Rook(color, x, y, game);
        this.bishop = new Bishop(color, x, y, game);
    }

    public possibleMoves(map) : Array<any> {
        return this.rook.possibleMoves(map).concat(this.bishop.possibleMoves(map));
    }

    public moveTo(x,y,map) : boolean {
        let bMoved = this.bishop.moveTo(x,y, map);
        let rMoved = this.rook.moveTo(x,y,map);
        if (bMoved) {
            this.x = this.bishop.x;
            this.y = this.bishop.y;
            this.figureMoved.push(this.bishop);
        } else if (rMoved) {
            this.x = this.rook.x;
            this.y = this.rook.y;
            this.figureMoved.push(this.rook);
        }
        this.bishop.x = this.x;
        this.bishop.y = this.y;
        this.rook.x = this.x;
        this.rook.y = this.y;
        return bMoved || rMoved;
    }

    public undoMove() : void {
        if (this.figureMoved.isEmpty()) {
            return;
        }
        let last : Figure = this.figureMoved.pop();
        last.undoMove();
        this.x = last.x;
        this.y = last.y;
        if (last instanceof Rook) {
            this.bishop.x = last.x;
            this.bishop.y = last.y;
        } else {
            this.rook.x = last.x;
            this.rook.y = last.y;
        }
    }
}
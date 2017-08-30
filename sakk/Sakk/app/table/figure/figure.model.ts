import { FigureSet, GameInstance } from '../table-service/game.instance.service';

import { Stack } from '../../stack';

export abstract class Figure {

    public url: String;
    public firstMove : boolean = true;
    protected mementos : Stack<Memento> = new Stack<Memento>();
    constructor (public name : String, public value : number, public color: number, public x : number, public y : number, protected game : FigureSet){
        this.url = this.setUrl();
    }

    private setUrl() : String {
        return "assets/basic-figures/" + this.name.toLowerCase() + "_" + (this.color == GameInstance.LIGHT? "white" : "black") + ".png";
    }

    /*
    params:
    map: a matrix showing information about the table (0 if the cell is free, 1 if the cell has an ally in, -1 if the cell hes an enemy in it)
    returns: an array of x,y coordinates na type = {'free', 'occupied-ally', 'occupied-enemy', 'no-move'}
    */
    abstract possibleMoves(map) : Array<any>;

    public moveTo(x,y,map) : boolean {
        let validMove = false;
        this.possibleMoves(map).forEach(move => {
            if(move.x == x && move.y == y && move.type == "allowed") {
                validMove = true;
            }
        });
        if (!validMove) {
            return false;
        }
        let memento = new Memento();
        memento.x = this.x;
        memento.y = this.y;
        memento.firstMove = this.firstMove;
        memento.killed = this.game.killFigure(x,y);
        this.mementos.push(memento);
        this.firstMove = false;
        this.x = x;
        this.y = y;
        return true;
    }

    public undoMove() : void {
        if (this.mementos.isEmpty()) {
            return;
        }
        let memento = this.mementos.pop();
        this.x = memento.x;
        this.y = memento.y;
        this.firstMove = memento.firstMove;
        
        this.game.reviveFigure(memento.killed);
    }
}

export class Memento {
    public x : number;
    public y : number;
    public firstMove : boolean;
    public killed : Figure;
}
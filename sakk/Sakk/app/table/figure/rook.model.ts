import { Figure } from './figure.model';
import { FigureSet, GameInstance } from '../table-service/game.instance.service';


export class Rook extends Figure {

    public rooked : boolean = false;

    constructor(color : number,  x : number, y : number, game : FigureSet) {
        super("Rook", 5, color, x, y, game);
    }

    public possibleMoves(map) : Array<any> {
        let ret = Array<any>();

        let left_end = Math.max(1,this.x-1)+1;
        let right_end = Math.min(8,this.x+1)-1;
        let top_end = Math.max(1,this.y-1)+1;
        let bottom_end = Math.min(8,this.y+1)-1;
        debugger;
        while (--left_end > 1 && !map[left_end-1][this.y-1]) {}
        while (++right_end < 8 && !map[right_end-1][this.y-1]) {}
        while (--top_end > 1 && !map[this.x-1][top_end-1]) {}
        while (++bottom_end < 8 && !map[this.x-1][bottom_end-1]) {}

        for (var i=left_end+1; i<right_end; i++) {
            if (i != this.x) {
                ret.push({x: i, y: this.y, type: "allowed"}); 
            }
        }

        for (var j=top_end+1; j<bottom_end; j++) {
            if (j != this.y) {
                ret.push({x: this.x, y: j, type: "allowed"}); 
            }
        }

        debugger;
        if (map[left_end-1][this.y-1] == this.color){
            ret.push({x: left_end, y: this.y, type: "disallowed"});             
        } else {
            ret.push({x: left_end, y: this.y, type: "allowed"});                         
        }
        if (map[right_end-1][this.y-1] == this.color){
            ret.push({x: right_end, y: this.y, type: "disallowed"});             
        } else {
            ret.push({x: right_end, y: this.y, type: "allowed"});                         
        }
        if (map[this.x-1][bottom_end-1] == this.color){
            ret.push({x: this.x, y: bottom_end, type: "disallowed"});             
        } else {
            ret.push({x: this.x, y: bottom_end, type: "allowed"});                         
        }
        if (map[this.x-1][top_end-1] == this.color){
            ret.push({x: this.x, y: top_end, type: "disallowed"});             
        } else {
            ret.push({x: this.x, y: top_end, type: "allowed"});                         
        }

        ret.push({x: this.x, y: this.y, type: "no-move"});

        return ret;
    }
}
import { Figure } from './figure.model';
import { FigureSet, GameInstance } from '../table-service/game.instance.service';


export class Bishop extends Figure {

    constructor(color : number, x : number, y : number, game : FigureSet) {
        super("bishop", 3, color, x, y, game);
    }

    public possibleMoves(map) : Array<any> {
        let ret = Array<any>();

        let positive_m = this.y - this.x;
        let negative_m = this.y + this.x;

        let desc_left = Math.max(1,this.x-1);
        let desc_right = Math.min(8,this.x+1);
        let asc_left = Math.max(1,this.x-1);
        let asc_right = Math.min(8,this.x+1);
        
        let desc = new Line(negative_m, -1);
        let asc = new Line(positive_m, +1);

        while(desc_left > 1 && desc.getY(desc_left) > 1 && !map[desc_left-1][desc.getY(desc_left)-1]){
            desc_left--;
        }
        while(desc_right < 8 && desc.getY(desc_right) < 8 && !map[desc_right-1][desc.getY(desc_right)-1]){
            desc_right++;
        }
        while(asc_left > 1 && asc.getY(asc_left) > 1 && !map[asc_left-1][asc.getY(asc_left)-1]){
            asc_left--;
        }
        while(asc_right < 8 && asc.getY(asc_right) < 8 && !map[asc_right-1][asc.getY(asc_right)-1]){
            asc_right++;
        }

        for(var i = desc_left+1; i<desc_right; i++) {
            if (i == this.x){
                continue;
            }
            ret.push({x: i, y: desc.getY(i), type: "allowed"}); 
        }
        for (var j = asc_left+1; j<asc_right; j++) {
            if (j == this.x){
                continue;
            }
            ret.push({x: j, y: asc.getY(j), type: "allowed"});
        }

        let ownColor = this.color == GameInstance.LIGHT ? 1 : -1;

        if (map[desc_left-1][desc.getY(desc_left)-1] == ownColor ) {
            ret.push({x: desc_left, y: desc.getY(desc_left), type: "disallowed"});            
        } else {
            ret.push({x: desc_left, y: desc.getY(desc_left), type: "allowed"});            
        }
        if (map[desc_right-1][desc.getY(desc_right)-1] == ownColor ) {
            ret.push({x: desc_right, y: desc.getY(desc_right), type: "disallowed"});            
        } else {
            ret.push({x: desc_right, y: desc.getY(desc_right), type: "allowed"});            
        }
        if (map[asc_left-1][asc.getY(asc_left)-1] == ownColor ) {
            ret.push({x: asc_left, y: asc.getY(asc_left), type: "disallowed"});            
        } else {
            ret.push({x: asc_left, y: asc.getY(asc_left), type: "allowed"});            
        }
        if (map[asc_right-1][asc.getY(asc_right)-1] == ownColor ) {
            ret.push({x: asc_right, y: asc.getY(asc_right), type: "disallowed"});            
        } else {
            ret.push({x: asc_right, y: asc.getY(asc_right), type: "allowed"});            
        }

        ret.push({x: this.x, y: this.y, type: "no-move"});

        return ret;
    }
}

class Line {

    constructor(private offset : number, private direction : number) {}

    public getY(x : number) :number {
        return this.direction*x + this.offset;
    }


}
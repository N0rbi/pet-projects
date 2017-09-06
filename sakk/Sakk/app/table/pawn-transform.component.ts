import { Component, Input, Output, EventEmitter, OnInit, HostBinding } from '@angular/core';
import { GameInstance } from './table-service/game.instance.service';


@Component({
    moduleId: module.id,
    selector: 'pawn-transform',
    templateUrl: 'pawn-transform.component.html',
    styleUrls: ['pawn-transform.component.css']
})
export class PawnTransformComponent implements OnInit{
    @Input()
    public color : number;
    @Output()
    public figureChosen : EventEmitter<string> = new EventEmitter();
    @HostBinding('style.color')
    private styleColor : string;
    public figures : Array<PawnTransformOption> = new Array<PawnTransformOption>();

    private setupFigures() : void {
        for (let f of [PawnTransformOption.BISHOP, PawnTransformOption.KNIGHT, PawnTransformOption.QUEEN, PawnTransformOption.ROOK]) {
            let figure : PawnTransformOption = new PawnTransformOption();
            figure.color = this.color;
            figure.type = f;
            this.figures.push(figure);
        }
    }

    public ngOnInit() : void {
        this.setupFigures();
        this.styleColor = this.color == GameInstance.LIGHT ? 'white' : 'black';
    }

    public chosenFigure(figure : PawnTransformOption) : void {
        console.log(this.color);
        console.log(GameInstance.LIGHT);
        console.log(this.figures);
        this.figureChosen.emit(figure.codeToTypeString());
    }
}

class PawnTransformOption {
    public static BISHOP = 0;
    public static KNIGHT = 1;
    public static QUEEN = 2;
    public static ROOK = 3;
    
    public type : number;
    public color : number;

    public getUrl() : string {
        return "assets/basic-figures/" + this.codeToTypeString() + "_" + (this.color == GameInstance.LIGHT ? "white" : "black") + ".png";
    }

    public codeToTypeString() : string {
        switch(this.type) {
            case PawnTransformOption.BISHOP:
            return 'bishop';
            case PawnTransformOption.KNIGHT:
            return 'knight';
            case PawnTransformOption.QUEEN:
            return 'queen';
            case PawnTransformOption.ROOK:
            return 'rook';
            default:
            throw Error('Not supported fighure type.');
        }
    }
}
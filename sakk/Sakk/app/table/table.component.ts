import { Component, OnInit } from '@angular/core';
import { Figure } from './figure/figure.model';
import { King } from './figure/king.model';
import { GameService } from './table-service/game.service';


@Component({
    moduleId: module.id,
    selector: 'chess-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    providers: []
})
export class TableComponent implements OnInit {
    public rows : Array<number> = [1,2,3,4,5,6,7,8];
    public cols : Array<String> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    private figuresToRender : Array<Figure>;
    private coloredTiles : Array<any>;
    private figureToMove : Figure;

    constructor(public gameService : GameService) {}

    public cellColor(col, row) : String {
        let cellColor = null;
        if(this.coloredTiles) {
            this.coloredTiles.forEach(tile => {
                if(this.columnValue(col)==tile.x && row==tile.y){
                    cellColor = tile.type;
                }
            });
        }
        return cellColor + " " + ((this.columnValue(col)  % 2 == (row-1) % 2) ? 'light' : 'dark') ;
    }

    public handleCellClick(cell) : void {
        if (this.gameService.enemyTurn()) {
            return;
        }
        let fig : Figure = cell.figure as Figure;
        if ( !this.figureToMove ) {
            this.clear();
        }
        if( !this.figureToMove && this.gameService.isFigureMovable(fig)) {
            this.figureToMove = fig;
            this.coloredTiles = this.gameService.getHintedCells(this.figureToMove);
            return;
        } else {
            let moved = this.gameService.moveFigure(this.figureToMove,this.columnValue(cell.col), cell.row);
            if (moved) {
                this.gameService.endTurn();
            }
        }
        this.clear();
        this.requestRender();
    }

    public clear() {
        this.figureToMove = null;
        this.coloredTiles = null;        
    }

    public setHostedFigure(col, row) : Figure {
        var colValue = this.columnValue(col);
        for(var i = 0; i < this.figuresToRender.length; i++) {
            let fig = this.figuresToRender[i];

            if(fig.x == colValue && fig.y == row) {
                return fig;
            }
        }

        return null;
    }

    public ngOnInit() : void {
        this.requestRender();
    }

    private requestRender() : void {
        this.figuresToRender = this.gameService.getFigures();
    }

    private columnValue(col) {
        return col.charCodeAt(0)-'A'.charCodeAt(0) + 1;
    }

}
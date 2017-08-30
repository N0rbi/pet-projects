import {Component, Input, Output, EventEmitter } from '@angular/core';
import { Figure } from '../figure/figure.model';

@Component({
    moduleId: module.id,
    selector: 'cell',
    templateUrl: 'cell.component.html',
    styleUrls: ['cell.component.css']
})
export class CellComponent {
    @Input()
    baseColor : String;
    @Input()
    currentState : String;
    @Input()
    figure : Figure;
    @Input()
    col : String;
    @Input()
    row : number;
    @Output()
    cellClicked = new EventEmitter();

    cellClickHandler() : void {
        this.cellClicked.emit({col: this.col, row: this.row, figure: this.figure});
    }
}
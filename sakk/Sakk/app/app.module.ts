import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { TableComponent } from './table/table.component';
import { CellComponent } from './table/cell/cell.component';
import { SidePanelComponent } from './side-panel/side-panel.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, TableComponent, CellComponent, SidePanelComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

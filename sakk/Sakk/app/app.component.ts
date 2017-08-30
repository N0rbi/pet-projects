import { Component } from '@angular/core';
import { UtilService } from './util/util.service';
import { GameService } from './table/table-service/game.service';
import { GameInstanceService } from './table/table-service/game.instance.service';
import { GameMasterService } from './table/table-service/game-master.service';
import { PlayerService }  from './table/table-service/player.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: '<chess-table></chess-table><side-panel></side-panel>',
  styleUrls: ['app.component.css'],
  providers: [UtilService, GameService, GameInstanceService, GameMasterService, PlayerService]
})
export class AppComponent { }

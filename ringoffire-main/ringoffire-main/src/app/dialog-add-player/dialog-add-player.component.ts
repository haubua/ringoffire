import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent {

  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>) {
  }
  name: string = '';
  
  game: Game;
  public selectedImg = '';

  

  onNoClick() {
    this.dialogRef.close();
  }
}
import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent {
  name: string = '';
  
  game: Game;
  public selectedImg = '';

  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>) {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
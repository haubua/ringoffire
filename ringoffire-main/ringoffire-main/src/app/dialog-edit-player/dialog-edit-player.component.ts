import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss']
})
export class DialogEditPlayerComponent {
  name: string = '';
  playerImg = ['avatar.png', 'male.png', 'smiley.webp', 'woman.webp', 'woman2.webp', 'penguin.webp']

  constructor(private dialogRef: MatDialogRef<DialogEditPlayerComponent>) {
  }
  
  onNoClick() {
    this.dialogRef.close();
  }

}

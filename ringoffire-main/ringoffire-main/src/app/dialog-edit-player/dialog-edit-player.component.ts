import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss']
})
export class DialogEditPlayerComponent {

  constructor(private dialogRef: MatDialogRef<DialogEditPlayerComponent>) {
  }
  
  name: string = '';
  playerImg = ['avatar.png', 'male.png', 'smiley.webp', 'woman.webp', 'woman2.webp', 'penguin.webp']

  
  onNoClick() {
    this.dialogRef.close();
  }

}

import { Component, OnInit, Output } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  playedCards: string[] = [];
  public game: Game;
  gameId: string = '';
  showAddPlayer: boolean = false;
  gameOver: boolean = false;
  lastCard:boolean = false;


  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: AngularFirestore, private router: Router) { }


  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((param: any) => {
      this.gameId = param.id;
      this.firestore.collection('game').doc(this.gameId).valueChanges().subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
        this.game.playerAvatar = game.playerAvatar;
      })
    })
  }


  async pickCard() {
    if (!this.game.pickCardAnimation && this.game.players.length > 0) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      await this.saveGame();
      if (this.game.stack.length <= 3) {
        this.game.unplayedCards.pop();
      }
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();
      }, 1150)
    }
    if (this.game.players.length == 0) {
      this.showAddPlayer = true;
      setTimeout(() => {
        this.showAddPlayer = false;
      }, 4000)
    }
    if (this.game.stack.length == 0) {
      this.lastCard = true;
      setTimeout(() => {
        this.gameOver = true;
      }, 2000)
    }

  }

  newGame() {
    this.game = new Game();
  }

  routeToStart() {
    this.router.navigateByUrl('');
  }

  restartGame() {
    this.game.stack = [];
    this.game.playedCards = [];
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.game.pickCardAnimation = false;
    this.game.currentCard = '';
    this.game.unplayedCards = ['0', '1', '2'];
    this.gameOver = false;
    this.lastCard = false;
    this.restartGameCards()
    this.saveGame();
  }

  restartGameCards() {
    for (let i = 1; i < 2; i++) {
      this.game.stack.push('spade_' + i)
      this.game.stack.push('hearts_' + i)
      this.game.stack.push('clubs_' + i)
      this.game.stack.push('diamonds_' + i)
    }
    this.shuffle(this.game.stack)
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerAvatar.push('penguin.webp')
        this.saveGame();
      }
    });
  }


  editPlayer(playerId): void {
    const dialogRef = this.dialog.open(DialogEditPlayerComponent);
    console.log(playerId)
    dialogRef.afterClosed().subscribe(change => {
      if (change) {
        if (change == 'Delete') {
          this.game.players.splice(playerId, 1)
          this.game.playerAvatar.splice(playerId, 1)
        } else {
          this.game.playerAvatar[playerId] = change;
        }
      }

      this.saveGame()
    })
  }

  saveGame() {
    this.firestore.collection('game').doc(this.gameId).update(this.game.toJson());
  }
}
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit{

  constructor(private router : Router, private firestore: AngularFirestore,   private eventEmitterService: EventEmitterService    ) {}


  ngOnInit() {    
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      startGame.subscribe((name:string) => {    
        this.startGame();    
      });    
    }    
  }  

  startGame() {
    let game = new Game();
    this.firestore.collection('game').add(game.toJson()).then((gameInfo) => {
      this.router.navigateByUrl('/game/' + gameInfo.id)
    })
    
  }
}

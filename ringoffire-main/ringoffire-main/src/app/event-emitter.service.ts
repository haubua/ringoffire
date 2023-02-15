import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  startGame = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  onFirstComponentButtonClick() {    
    this.startGame.emit();    
  }    
}    
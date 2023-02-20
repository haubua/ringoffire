export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';
    public unplayedCards: string[] = ['0', '1', '2'];
    public playerAvatar: string[] = [];
    
    constructor() {
        for (let i = 1; i < 13; i++) {
            this.stack.push('spade_' + i)
            this.stack.push('hearts_' + i)
            this.stack.push('clubs_' + i)
            this.stack.push('diamonds_' + i)
        }
        shuffle(this.stack)
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
            playerAvatar: this.playerAvatar
        }
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
export class Projectile {
    constructor(game){
        this.game = game;
        this.width = 8;
        this.height = 40;
        this.x = 0; 
        this.y = this.game.height + 100;
        this.speed = 20;
        this.isFree = true;
    }

    draw (ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x , this.y, this.width, this.height)
    }

    update(){
        if (!this.isFree){
            this.y -= this.speed;
        }

        if (this.y < -this.height){   //if projectile goes out of screen or colides with enemy. checkColission is method of game and it is recommended that colission is checked on the enemies
            this.reset();
        }
    }

    reset(){
       this.isFree = true;
    }

    start(playerPosX,playerPosY){
        this.x = playerPosX - this.width*0.5;
        this.y = playerPosY;
        this.isFree = false;
    }

}
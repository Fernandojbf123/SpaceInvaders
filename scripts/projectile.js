export class Projectile {
    constructor(game){
        this.game = game;
        this.width = 8;
        this.height = 40;
        this.positionX = -this.width; 
        this.positionY = -this.height;
        this.speed = 20;
        this.isFree = true;
    }

    draw (ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.positionX , this.positionY, this.width, this.height)
    }

    update(){
        if (!this.isFree){
            this.positionY -= this.speed;
        }
        if (this.positionY < -this.height){   //if projectile goes out of screen or colides with enemy
            this.reset();
        }
    }

    reset(){
       this.isFree = true;
    }

    start(playerPosX,playerPosY){
        this.positionX = playerPosX - this.width*0.5;
        this.positionY = playerPosY;
        this.isFree = false;
    }

}
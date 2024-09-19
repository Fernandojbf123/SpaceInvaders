import {keysInput} from "./playerInput.js";

export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.positionX = this.game.width/2 - this.width/2;
        this.positionY = this.game.height-this.height;
        this.speed = 10;
    }

    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.positionX,this.positionY,this.width,this.height)
    }

    //updates movevement of the player
    update(){

        // Movement of the player
        const pressedKey = this.game.input.keys[0];
        if (pressedKey === keysInput.LEFT){
            this.positionX -= this.speed;
        } else if (pressedKey === keysInput.RIGHT){
            this.positionX += this.speed;
        }

        // Boundaries
        if (this.positionX < 0 - this.width/2){
            this.positionX = - this.width/2 ;
        } else if (this.positionX > this.game.width - this.width/2){
            this.positionX = this.game.width - this.width/2;
        }
    }

    shoot() {
        const projectile = this.game.getProjectile();
        if (projectile){
            projectile.start(this.positionX+this.width/2,this.positionY)
        }
    }

}
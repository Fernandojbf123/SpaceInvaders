import {keysInput} from "./playerInput.js";

export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height-this.height;
        this.speed = 10;
    }

    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }

    //updates movevement of the player
    update(){

        // Movement of the player
        const pressedKey = this.game.input.keys[0];
        if (pressedKey === keysInput.LEFT){
            this.x -= this.speed;
        } else if (pressedKey === keysInput.RIGHT){
            this.x += this.speed;
        }

        // Boundaries
        if (this.x < 0 - this.width * 0.5){
            this.x = - this.width * 0.5 ;
        } else if (this.x > this.game.width - this.width * 0.5){
            this.x = this.game.width - this.width * 0.5;
        }
    }

    shoot() {
        const projectile = this.game.getProjectile();
        if (projectile){
            projectile.start(this.x + this.width * 0.5, this.y)
        }
    }

}
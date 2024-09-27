import { Enemy } from "./enemy.js";

export class Wave{
    constructor(game){
        this.game = game;
        this.width = this.game.columns * this.game.enemyWidth;
        this.height = this.game.rows * this.game.enemyHeight;
        this.positionX = 0;
        this.positionY = -this.height;
        this.speedX = 3;
        this.speedY = 0;
        this.enemies = [];
        this.createEnemy();
    }

    render(ctx){
        // Visual helper for wave grid
        // ctx.lineWidth = 5;
        // ctx.strokeStyle = 'white';
        // ctx.strokeRect(this.positionX,this.positionY,this.width,this.height);

        // vertical speed reset to 0
        this.speedY = 0;

        // Arrival of wave to screen (combat zone)
        if (this.positionY < 0){
            this.positionY += 5;
        }

        // Horizontal and vertical movement
        if (this.positionX < 0 || this.positionX > this.game.width - this.width){
            this.speedX *= -1;
            this.speedY = this.game.enemyHeight;
        }

        this.positionX += this.speedX;
        this.positionY += this.speedY;

        this.enemies.forEach ( enemy => {
            enemy.update(this.positionX, this.positionY);
            enemy.draw(ctx)
        })

        this.enemies = this.enemies.filter( enemy => !enemy.isMarkedForDeletion)
        
    }

    createEnemy(){

        for (let row = 0; row< this.game.rows; row++ ){
            for (let col = 0; col < this.game.columns; col++){
                // position of each enemy relative to the grid
                let enemyX = (col * this.game.enemyWidth);
                let enemyY = (row * this.game.enemyHeight);
                this.enemies.push(new Enemy(this.game, enemyX, enemyY))
            }
        }
    }


}
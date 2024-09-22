export class Enemy{
    constructor(game, enemyX, enemyY){
        //when instanciating an enemy, it will be positioned according to its relative position to grid
        this.game = game;
        this.width = this.game.enemyWidth;
        this.height = this.game.enemyHeight;
        
        this.x = enemyX; // position of enemy in the canvas
        this.y = enemyY; // position of enemy in the canvas
        
        this.positionX = enemyX; // Position of the enemy relative to grid
        this.positionY = enemyY; // Position of the enemy relative to grid
        // console.log(`x = ${this.positionX} y = ${this.positionY}`)
    }

    draw(ctx){
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    update(wavePosX,wavePosY){
        this.x = wavePosX + this.positionX; //current wave position + relative position
        this.y = wavePosY + this.positionY;
        
        //check colission enemy - projectile
        this.game.checkColission(this, this.game.projectile)
        
    }
}
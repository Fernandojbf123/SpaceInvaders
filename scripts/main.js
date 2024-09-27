import { Player } from "./player.js";
import { PlayerInput } from "./playerInput.js";
import { Projectile } from "./projectile.js";
import { Wave } from "./wave.js";


class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.width  = this.canvas.width;
        this.height = this.canvas.height;
        
        this.player = new Player(this);
        this.input  = new PlayerInput(this);
        
        // Projectiles
        this.projectilesPool = [];
        this.numberOfProjectiles = 10;
        this.createProjectiles();

        // Enemy waves
        this.columns = 2;
        this.rows = 2;
        this.enemyWidth = 60;
        this.enemyHeight = 60;

        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;

        this.score = 0;
        this.gameOver = false;
    }

    render(ctx){
        this.drawStatusText(ctx);
        this.player.draw(ctx);
        this.player.update();
        
        // Projectiles poll
        this.projectilesPool.forEach ( projectile => {
            projectile.update();
            projectile.draw(ctx);
        })

        // Render waves
        this.waves.forEach ( wave =>  {
            wave.render(ctx)
            if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver){
                this.newWave();
                this.waveCount++;
                wave.nextWaveTrigger = true;

            }
        })  
    };

    // Create projectiles object pool
    createProjectiles(){
        for (let it = 0; it < this.numberOfProjectiles; it++){
            this.projectilesPool.push(new Projectile(this));
        }
    };

    // Get one free projectile from projectile object pool
    getProjectile(){
        for (let it = 0; it < this.numberOfProjectiles; it++){
            if (this.projectilesPool[it].isFree){
                return this.projectilesPool[it];
            }
            
        }
    };

    checkColission(a, b) {
        //a and b are rectangles that must have x,y, width and height properties.
        return(
            a.x <= b.x + b.width &&
            a.x + a.width >= b.x &&
            a.y <= b.y + b.width &&
            a.y + a.height >= b.y
        )
    };

    drawStatusText(ctx){
        ctx.save();
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = 'black';
        ctx.fillText(`Score:  ${this.score} `, 20, 40)
        ctx.fillText(`Wave:  ${this.waveCount} `, 20, 90)
        if (this.gameOver){
            ctx.textAlign = 'center';
            ctx.font = '100px Impact';
            ctx.fillText('GAME OVER!', this.width *0.5, this.height*0.5)
        }
        ctx.restore();
    };

    newWave(){
        this.columns++;
        this.rows++;
        this.waves.push(new Wave(this));
    }

}

window.addEventListener('load', function () {

    const $canvas1 = document.getElementById("canvas1");
    const ctx = $canvas1.getContext('2d');
    $canvas1.width = 600;
    $canvas1.height = 800;
    ctx.font = "40px Impact";


    const game = new Game($canvas1);
    
    animate()





    function animate () {
        ctx.clearRect(0, 0, game.width, game.height)
        game.render(ctx)
        requestAnimationFrame(animate);
    }
    

})
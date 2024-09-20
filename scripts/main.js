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
        this.columns = 3;
        this.rows = 3;
        this.enemyWidth = 60;
        this.enemyHeight = 60;

        this.waves = [];
        this.waves.push(new Wave(this));
    }

    

    render(ctx){
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
        })
        
    }

    // Create projectiles object pool
    createProjectiles(){
        for (let it = 0; it < this.numberOfProjectiles; it++){
            this.projectilesPool.push(new Projectile(this));
        }
    }

    // Get one free projectile from projectile object pool
    getProjectile(){
        for (let it = 0; it < this.numberOfProjectiles; it++){
            if (this.projectilesPool[it].isFree){
                return this.projectilesPool[it];
            }
            
        }
    }

}

window.addEventListener('load', function () {

    const $canvas1 = document.getElementById("canvas1");
    const ctx = $canvas1.getContext('2d');
    $canvas1.width = 600;
    $canvas1.height = 800;

    const game = new Game($canvas1);
    
    animate()





    function animate () {
        ctx.clearRect(0, 0, game.width, game.height)
        game.render(ctx)
        requestAnimationFrame(animate);
    }
    

})
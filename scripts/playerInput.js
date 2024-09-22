export const keysInput = {
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    FIRE1: "FIRE1"
} 
export const RIGHT = "RIGHT";


export class PlayerInput{
    constructor(game){
        this.game = game;
        this.keys = [];


        window.addEventListener('keydown', e => {
            if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a"){
                this.keyDown(keysInput.LEFT)
                
            } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d"){
                this.keyDown(keysInput.RIGHT)
            } else if (e.key === "k" || e.key.toLowerCase() === "k"){
                this.game.player.shoot();                
            }

        })

        window.addEventListener('keyup', e => {
            if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a"){
                this.keyUp(keysInput.LEFT)
            } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d"){
                this.keyUp(keysInput.RIGHT)
            }
        })
    }

    keyDown(key){
        if (this.keys.includes(key) === false) {
            this.keys.push(key)
        }
    }

    keyUp(key){
        const index = this.keys.indexOf(key)
        if (index !== -1){
            this.keys.splice(index,1);
        }
        
    }

    

}
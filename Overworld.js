class Overworld {
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

//GameLoop!!
    startGameLoop(){
        const step = ()=>{
            
         //Clears off canvas after animation
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //Draw Lower Image
        this.map.drawLowerImage(this.ctx);

        //Draws Game Objects
        Object.values(this.map.gameObjects).forEach(object=> {
           object.update({
               arrow: this.directionInput.direction

           })
            object.sprite.draw(this.ctx);
        })

        //Draws Upper Layer
        this.map.drawUpperImage(this.ctx);

            requestAnimationFrame(()=> {
                step();
            })
        }
        step();
    }

    //Will be drawn from top to bottom by default
    init(){
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();


    }

}
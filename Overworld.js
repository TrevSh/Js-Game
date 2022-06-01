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

        //Establish Camera dude
        const cameraPerson = this.map.gameObjects.hero;

        //update all objects
        Object.values(this.map.gameObjects).forEach(object=> {
            object.update({
                arrow: this.directionInput.direction,
                map: this.map,
            })
        })

        //Draw Lower Image
        this.map.drawLowerImage(this.ctx, cameraPerson);

        //Draws Game Objects
        Object.values(this.map.gameObjects).forEach(object=> {
            object.sprite.draw(this.ctx, cameraPerson);
        })

        //Draws Upper Layer
        this.map.drawUpperImage(this.ctx, cameraPerson);

            requestAnimationFrame(()=> {
                step();
            })
        }
        step();
    }

    //Will be drawn from top to bottom by default
    init(){
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();


    }

}
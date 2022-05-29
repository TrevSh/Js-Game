class Overworld {
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    //Will be drawn from top to bottom by default
    init(){
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image,0,0)
        };
        image.src = "/images/maps/DemoLower.png";   //map

        const x = 5;
        const y = 6;

        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow,
                0,  //left cut
                0,  //top cut
                32, //width of cut
                32, //height of cut                                 //Spritesheet requires 8 values
                x * 16 - 8,  //x position (*16 to account for grid)
                y * 16 - 18,  //y position (*16 to account for grid. -18 and -8 to set feet in grid)
                32, //size
                32, //size
            )
        }
        shadow.src = "/images/characters/shadow.png";

        const hero = new Image();   //Spritesheet cutting
        hero.onload = () => {
            this.ctx.drawImage(
                hero,
                0,  //left cut
                0,  //top cut
                32, //width of cut
                32, //height of cut                                 //Spritesheet requires 8 values
                x * 16 - 8,  //x position (*16 to account for grid)
                y * 16 - 18,  //y position (*16 to account for grid. -18 and -8 to set feet in grid)
                32, //size
                32, //size

         )
        }
        hero.src = "/images/characters/people/hero.png" //spritesheet file


    }

}
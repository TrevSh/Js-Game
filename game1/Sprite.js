class Sprite {
    constructor(config){

        //Set Up image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = ()=> {
            this.isLoaded = true;
        }

        //Shadow
        this.shadow = new Image();
        this.useShadow = true;  //config.useShadow || false
        if (this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png"
        }
        this.shadow.onload = ()=> {
            this.isShadowLoaded = true;
        }

        //Config Animation & Initial State
        this.animations = config.animations || {
            idleDown:[
                [0,0]
            ]
        }
        this.currentanimation = config.currentanimation || "idleDown";
        this.currentanimationFrame = 0;

        //Reference Game Object
        this.gameObject = config.gameObject;
    }
    draw(ctx) {
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

        this.isLoaded && ctx.drawImage(this.image,
            0,0,
            32,32,
            x,y,
            32,32
            )
    }
}
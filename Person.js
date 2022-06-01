class Person extends GameObject {
constructor(config){
    super(config);
    this.movingProgressRemaining = 0;
    this.isStanding= false;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
        "up": ["y", -1],
        "down": ["y", 1],
        "left": ["x", -1],
        "right": ["x", 1],
    }
}

update(state){
    if(this.movingProgressRemaining > 0){
    this.updatePosition();
    } else{
        //More cases for starting to walk go here
        //  
        //Case: Keyboard ready and have arrow pressed
        if (!state.map.isCutscenePlaying &&this.isPlayerControlled&& state.arrow){
            this.startBehavior(state,{
                type: "walk",
                direction: state.arrow
            })
        }
            this.updateSprite(state);

        }
    }
    
startBehavior(state, behavior){
    //Setting character direction
    this.direction = behavior.direction;
    if(behavior.type === "walk"){

        //Stop if space is not free
     if (state.map.isSpaceTaken(this.x, this.y, this.direction)){

         behavior.retry && setTimeout(()=> {
            this.startBehavior(state, behavior)
         },10)
        return;
    }

    //Ready to walk!
    state.map.moveWall(this.x, this.y, this.direction);
    this.movingProgressRemaining = 16;
    this.updateSprite(state);
        }

    if (behavior.type === "stand"){
        this.isstanding = true;
        setTimeout(()=>{
            utils.emitEvent("PersonStandComplete", { 
                whoId: this.id
            }) 
        }, behavior.time)
        this.isStanding = false;
        }
    }

updatePosition(){
    const [property, change] = this.directionUpdate[this.direction];
    this[property]+=change;
    this.movingProgressRemaining -=1;

    if (this.movingProgressRemaining === 0){
        //finished walk
        utils.emitEvent("PersonWalkingComplete",{
            whoId: this.id
        })

    }
}

updateSprite(){

    if(this.movingProgressRemaining > 0){
        this.sprite.setAnimation("walk-"+this.direction);
        return;
    }
    this.sprite.setAnimation("idle-"+this.direction);
    }
}



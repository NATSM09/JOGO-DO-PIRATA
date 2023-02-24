class CannonBall{
    constructor(x, y){
    var opitions = {
        isStatic : true,
    }
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r, opitions);
    this.image = loadImage("assets/cannonball.png");
    World.add(world, this.body)
    this.trajetoria = []
    }
    shoot(){
        var novoangulo = cannon.angle -28;
        novoangulo = novoangulo*3.14/180;
        var velocity = p5.Vector.fromAngle(novoangulo);
        velocity.mult(0.5)
        Matter.Body.setStatic(this.body,false)
        

    Matter.Body.setVelocity(this.body,{x : velocity.x*180/3.14, y : velocity.y*180/3.14})

    }

    remove( index ){
        Matter.Body.setVelocity( this.body, { x : 0, y : 0 })
        setTimeout(() =>{
            Matter.World.remove( world, this.body );

            delete balls[ index ]

        },1000)

     }
    show(){

    var pos = this.body.position;

    push()

imageMode(CENTER);
image(this.image, pos.x, pos.y, this.r, this.r);

    pop()
if(this.body.velocity.x > 0 && this.body.position.x > 300){
    var position = [this.body.position.x, this.body.position.y];
this.trajetoria.push(position);

}

for(var i = 0; i < this.trajetoria.length; i++){
 image(this.image, this.trajetoria[i][0], this.trajetoria[i][1], 5,5)
}

    }
}
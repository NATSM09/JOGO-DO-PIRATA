const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;

var backgroundImg;

var tower, towerImage;

var cannon;

var angle;

var balls = []

var boat;

var boats = []

var boatSpritedata;

var boatSpritesheet;

var boatAnimation = []

var brokenSpritedata;

var brokenSpritesheet;

var brokenAnimation = []

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  
  boatSpritedata = loadJSON("assets/boat/boat.json");
  boatSpritesheet = loadImage("assets/boat/boat.png");

  brokenSpritedata = loadJSON("assets/boat/broken_boat.json");
  brokenSpritesheet = loadImage("assets/boat/broken_boat.png");
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
 options={
 isStatic:true
 }

 tower = Bodies.rectangle(160,350,160,310,options);
 World.add(world,tower);
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 angleMode(DEGREES)
angle = 20;
 cannon = new Cannon(180, 110, 130, 100, angle);
 cannonBall = new CannonBall(cannon.x, cannon.y)

 boat = new Boat( width -79, height -60, 170, 170, -80)

 var boatFrames = boatSpritedata.frames;

 for(var i = 0; i < boatFrames.length; i++){
  var poss = boatFrames[i].position;
  var img = boatSpritesheet.get(poss.x, poss.y, poss.w, poss.h);
  boatAnimation.push(img)
 }

 var brokenFrames = brokenSpritedata.frames;

 for(var i = 0; i < brokenFrames.length; i++){
  var poss = brokenFrames[i].position;
  var img = brokenSpritesheet.get(poss.x, poss.y, poss.w, poss.h);
  brokenAnimation.push(img)
 }
}

function draw() {
  image(backgroundImg,0,0,1200,600);
  Engine.update(engine);
 
 rect(ground.position.x, ground.position.y,width*2,1);
  
 push();
 imageMode(CENTER);
 image(towerImage,tower.position.x,tower.position.y,160,310);
 pop();
for(var i = 0; i < balls.length; i ++){
  showCannonBall(balls[i], i)

  colisao( i )
}
cannon.show()

showBoats()
}

function keyReleased(){

  if(keyCode === 32){
    balls[balls.length -1].shoot()
  }
}


function keyPressed (){

  if(keyCode === 32){
   var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBall(ball,i){
  if(ball){
    ball.show()

if( ball.body.position.x>=width || ball.body.position.y>=height -50){

   ball.remove( index ) 

}

  }
}

function showBoats() {


  if (boats.length > 0) {
 
 
    if (
 
 
      boats[boats.length - 1] === undefined ||
 
      boats[boats.length - 1].body.position.x < width - 300
 
 
    ) {
 
 
      var positions = [-40, -60, -70, -20];
 
      var position = random(positions);
 
      var boat = new Boat(width, height - 100, 170, 170, position, boatAnimation);
 
      boats.push(boat);
 
 
    }
 
    for (var i = 0; i < boats.length; i++) {
 
      if (boats[i]) {
 
 
        Matter.Body.setVelocity(boats[i].body, {
 
          x: -0.9,

          y: 0
 
        });
 
        boats[i].display();
        boats[i].animate()
      }
 
    }
 
  } else {
 
 
    var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
 
 
    boats.push(boat);
 
 
  }
 
 
 }

 function colisao( index ){

for( var i=0; i<boats.length; i++){

if( balls [ index ] !==undefined && boats [ i ] !==undefined ){

var bater = Matter.SAT.collides( balls [ index ].body, boats[ i ].body )

if( bater.collided ){

 boats[ i ].remove( i )
balls [ index ].remove( index )
}

}

}

 }
 
 
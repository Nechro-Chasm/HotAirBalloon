var balloon,balloonImage1,balloonImage2;
var database;
var position;
var size=1;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(50,200,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPos = database.ref("balloon/height")
  balloonPos.on("value", readHeight, showError)
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.x = balloon.x-5;
    updateHeight(balloon.x, balloon.y)
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.x = balloon.x+5;
    updateHeight(balloon.x, balloon.y)
  }
  else if(keyWentDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    console.log(size);
    balloon.scale = size
    size = size + 0.1;
  }
  else if(keyWentDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    console.log(size);
    if(size > 0.2){
    size=size-0.1;

    }
    size = size - 0.1
    balloon.scale = size
    
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function showError(){
console.log("error connecting to database");
}
function readHeight(data){
position = data.val()
balloon.x = position.x;
balloon.y = position.y;
}
 function updateHeight(xPos, yPos){
database.ref("balloon/height").set({
  x:xPos,
  y:yPos
})

 }

var monkey , monkeyRunning;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground;
var survivalTime = 0;
var score = 0; 

var jungle, jungleImage

function preload(){
  
  
  monkeyRunning =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  obstacleGroup = createGroup();
  
  jungleImage = loadImage("jungle.jpg")
 
}



function setup() {
  createCanvas(400,400);
  background(200);
  jungle = createSprite(0,0,400,400);
  jungle.addImage(jungleImage);
  jungle.scale = 1;
  
  ground = createSprite(200,390,600,10);
  ground.shapeColor = "brown";
  ground.x = ground.width/2;
  
  monkey = createSprite(30,370,20,20);
  monkey.addAnimation("monkey", monkeyRunning);
  monkey.scale = 0.1;
  monkey.debug = true;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background(0);
  
  survivalTime = Math.ceil(frameCount/frameRate()); 
  
 
  if (gameState === PLAY) {
    
    jungle.velocityX = -3;
    
    if (jungle.x < 100){
      jungle.x = jungle.width/2;
    }
    
    
    if(keyDown("space")&& monkey.y > 300){
      monkey.velocityY = - 10;
    }
    
    spawnBananas();
    spawnObstacles();
    
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score += 2;
  }
    
    if (score === 10){
      monkey.scale = 0.125;
    }
      
    if (score === 20){
      monkey.scale = 0.15;
    }
    
    if (score === 30){
      monkey.scale = 0.2;
    }
    
    if (score === 40){
      monkey.scale = 0.225;
    }
    
    if (monkey.isTouching(obstacleGroup)){
      monkey.scale = 0.07;
    }
  
  }
  
  if (gameState === END) {
    
  }
  drawSprites();
  textSize(25);
  fill("blue")
  text("score: "+ score, 270,50);
  textSize(20);
  fill("red")
  text("survivalTime: "+ survivalTime, 30,50);
  
  
  
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,270,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.y = Math.round(random(250,300));
    banana.lifetime = 100;
    bananaGroup.add(banana);
    
  }
    

}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(400,370,20,20);
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
  
    
}





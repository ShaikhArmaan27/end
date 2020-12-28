var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gamestates = "play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  townImg = loadImage("town.jpg")

}



function setup() {
   createCanvas(600, 600);
  


  var survivalTime=0;
   
   monkey=createSprite(80,315,20,20);

   monkey.addAnimation("moving", monkey_running);
  monkey.addImage(bananaImage)
   monkey.scale=0.1
   town = createSprite(monkey.x,150,20,20)
   town.velocityX=-0.5
   town.addImage(townImg)
   town.scale=2
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  camera.position.x = monkey
  camera.position.y = displayWidth/2
  
}


function draw() {
  
  background(255);
  
    
  if(town.x<100){
    town.x = monkey.x

  }
  
    if(gamestates === "play"){
      if(ground.x<200) {
       ground.x=ground.width/2;        
      }
      if(keyDown("space") ) {
      monkey.velocityY = -12;
     }
    monkey.velocityY = monkey.velocityY + 0.8
      
      spawnFood();
      spawnObstacles();
      
    survivalTime=Math.ceil(frameCount/frameRate())
      
    if(FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach();
   }
      
    if(obstaclesGroup.isTouching(monkey)){
        gamestates = "end"       
     }
      
    }
   
    else if(gamestates === "end"){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);  
      
    }
  
    monkey.collide(ground);   
    
 
  drawSprites();       
  
    
  
  stroke("black");
  textSize(20);
  fill("black");
   
  text("Survival Time: "+ survivalTime, 100,50);
  
   
  
}



function spawnFood() {
  
  if (frameCount % 120 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
      
    obstacle.lifetime = 300;
    
    
    obstaclesGroup.add(obstacle);
  }
}

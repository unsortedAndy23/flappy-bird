var branch , branchImg;
var bird, birdFly ,birdEnd;
var GAMESTATE= 0;
var score = 0;
var GameStarted = false , GameOverImg;
var colU , colUimg , colUg, colD, colDimg , colDg;
var back, backImg;
function preload(){
  colUimg = loadImage("columnU.png");
  colDimg = loadImage("columnD.png");
  branchImg = loadImage("branch.png");
  birdEnd = loadImage("bird1.png");
birdFly = loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png");
  
  gameOverImg = loadImage("gameover.png");
  backImg = loadImage("skyImage.jpeg");
}

function setup(){
  createCanvas(500,(window.innerWidth > 0) ? window.innerWidth : screen.width);
  back = createSprite(canvas.width/2,canvas.height/2,canvas.width,canvas.height);
  back.addImage(backImg)
  bird = createSprite(60,90,20,20);
  bird.addAnimation("birdFlying",birdFly);
  bird.addAnimation("collided", birdEnd);
  branch = createSprite(100,120,200,20);
  branch.addImage(branchImg)
  branch.lifetime=100;
  branch.velocityX = -2;
  branch.scale = 0.3

  //creating groups
  colUg = createGroup();
  colDg = createGroup();
  
}


function draw(){
  //set background color 
  background("blue");
  branch.setCollider("rectangle",0,10,400,10)

  bird.collide(branch);
  bird.setCollider("circle",0,0,13);
  if(GAMESTATE ===0){
    
    //score
    score = score + Math.round(getFrameRate()/60);
    
    
    
    
      
    
  //adding GRAVITY to the bird
  bird.velocityY = 3;
  
            //make the bird jump
            if(keyDown("up")){
              bird.velocityY = -3;
              if(GameStarted === false){
                GameStarted = true;
              }
            }
  
    
    //create columns
    createColumn();
    
    //check for collision & chnage the game state
     if(colUg.isTouching(bird) || colDg.isTouching(bird)){
       GAMESTATE = 1;
     }

  }
  //end state
  if(GAMESTATE ===1){
    
  //gavever icon
  gameOver = createSprite(250,100);
  gameOver.addImage(gameOverImg);
  bird.velocityY= 0;
  bird.velocityX= 0;
  branch.velocityX = 0;
  branch.lifetime = -1;
  bird.changeAnimation("collided", birdEnd);
    
  gameOver.visible = true;
  colUg.setVelocityXEach(0);
  colDg.setVelocityXEach(0);
  colUg.setLifetimeEach(-1);
  colDg.setLifetimeEach(-1);
  }
  
  

  

     bird.x = 60;
  if(bird.y < 0 || bird.y > 199){
    GAMESTATE = 1;
  }
  
  drawSprites();
  
  //displaying score
  fill(0, 0, 0);
  text("Score: "+ score, 400,40);
  if(GameStarted === false && GAMESTATE ===0){
            //background text
            textSize(32);
            fill(235, 52, 52);
            text("press 🔼 to fly",200,100)
      }
}

function createColumn(){
    if (frameCount % 80 === 0 && frameCount > 70) {
      var rand = Math.round(random(-70,70))
      colU = createSprite(550,rand,40,160);
      colD = createSprite(550,colU.y +220,40,160);
      colU.setCollider("rectangle",0,0,8,24);
      colD.setCollider("rectangle",0,0,8,24);
      colU.velocityX = -(3 + score/100);
      colD.velocityX = -(3 + score/100);
      colU.addImage(colUimg);
      colD.addImage(colDimg);
      colD.scale= 5;
      colU.scale= 5;
      colDg.add(colD);
      colUg.add(colU);
      
    }
}

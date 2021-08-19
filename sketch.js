var door, climber, ghost, tower, towerimg, invisibleblock, doorimg, climberimg, ghostimg;
var doorg, climberg, invisibleg, edges;
var gamestate="play"

function preload(){
    doorimg = loadImage("door.png");
    climberimg = loadImage("climber.png");
    towerimg = loadImage("tower.png");
    ghostimg = loadImage("door.png");
}

function setup(){
    createCanvas(600, 600);

    ghost = createSprite(300, 400, 50, 50);
    ghost.addImage(ghostimg);
    ghost.scale=1;
    ghost.debug=true;
    

    tower = createSprite(300, 300);
    tower.addImage(towerimg);
    tower.velocityY = 1;

    towerg = new Group();
    doorg = new Group();
    invisibleg= new Group();
    climberg = new Group();

}

function draw(){
    background(255);

    if(gamestate==="play"){
        if(keyDown("left")){
            ghost.x=ghost.x-2;
        }
        if(keyDown("right")){
            ghost.x= ghost.x+2;
        }
        if(keyDown("space")){
            ghost.velocityY= -10;
        }
        ghost.velocityY=ghost.velocityY+1;
        if(tower.y>400){
            tower.y=300;
        }
        spawnDoors();
        if(climberg.isTouching(ghost)){
            ghost.velocityY=0;
        }
        if(invisibleg.isTouching(ghost) ){
            ghost.destroy();
            gamestate="end";
        }
        edges = createEdgeSprites();
        ghost.collide(edges[2])
        drawSprites();    
    }
    if(gamestate==="end"){
        textSize(20)
        fill("red");
        text("Game Over", 300, 300);

    }
}

function spawnDoors(){
    if(frameCount % 240===0){
        door = createSprite(200, -50);
        door.addImage(doorimg);
        door.x = Math.round(random(120, 400));
        door.lifetime=800;
        door.velocityY=1;
        doorg.add(door);
        ghost.depth=door.depth;
        ghost.depth=ghost.depth+1;

        climber = createSprite(200, 10);
        climber.addImage(climberimg);
        climber.x = door.x;
        climber.velocityY=1;
        climber.lifetime= 800;
        climberg.add(climber);

        invisibleblock = createSprite(200, 15);
        invisibleblock.width = climber.width;
        invisibleblock.height=2;
        invisibleblock.x = door.x;
        invisibleblock.velocityY=1;
        invisibleblock.lifetime=800;
        invisibleg.add(invisibleblock);

    }

}



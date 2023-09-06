var fundo;
var gameState = "iniciar";
var botao, botaoImg;
var mana = 200;

var player, playerIdle, playerRun;
var shot, shotImg;

function preload() {
  fundo = loadImage("images/ceu_escuro.png");

  playerIdle = loadImage("animations/idle/idle.gif");
  playerRun = loadImage("animations/run/runOnline.gif");

  shotImg = loadImage("images/blueFire.gif");
}
function setup() {
  createCanvas(1000, 600);

  player = createSprite(500, 300, 20, 20);
  player.addImage("idle", playerIdle);
  player.addImage("run", playerRun);
  player.scale = 0.4;

  botao = createImg("images/playbutton.png");
  botao.position(665, 500);
  botao.size(200, 100);

  botao.mouseClicked(() => {
    gameState = "jogar";
  });
}

function draw() {
  background("black");
  image(fundo, 0, 0, 1000, 600);

  if (gameState === "iniciar") {
    textAlign(CENTER);
    textSize(50);
    fill("#F2FF76");
    textFont("Georgia");
    text("✨Witch's Game✨", width / 2, 125);
  }

  if (gameState === "jogar") {
    play();
  }

  drawSprites();
}

function controls() {
  if (keyDown("d")) {
    player.x = player.x + 6;
    player.mirrorX(1);
    player.changeImage("run");
  } else if (keyDown("a")) {
    player.x = player.x - 6;
    player.mirrorX(-1);
    player.changeImage("run");
  } else if (keyDown("w")) {
    player.y = player.y - 6;
    player.changeImage("run");
  } else if (keyDown("s")) {
    player.y = player.y + 6;
    player.changeImage("run");
  } else {
    player.changeImage("idle");
  }
}

function shots() {
  if (keyDown("right")) {
    shot = createSprite(player.x, player.y);
    shot.addImage("shot", shotImg);
    shot.scale = 0.1;
    shot.velocityX = 6;
    shot.rotation -= 90;
    mana -= 10;
  } else if (keyDown("left")) {
    shot = createSprite(player.x, player.y);
    shot.addImage("shot", shotImg);
    shot.scale = 0.1;
    shot.velocityX = -6;
    shot.rotation += 90;
    mana -= 10;
  } else if (keyDown("up")) {
    shot = createSprite(player.x, player.y);
    shot.addImage("shot", shotImg);
    shot.scale = 0.1;
    shot.velocityY = -6;
    shot.rotation += 180;
    mana -= 10;
  } else if (keyDown("down")) {
    shot = createSprite(player.x, player.y);
    shot.addImage("shot", shotImg);
    shot.scale = 0.1;
    shot.velocityY = 6;
    mana -= 10;
  }
}

function play() {
  controls();
  botao.hide();

  if (mana > 0) {
    shots();
  }
}

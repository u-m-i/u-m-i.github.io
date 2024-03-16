import {Platform, Pitfall, WinBarrier, Character, Coin, Enemy, limits, rules, createDirectionMap} from './configuration.js';

let directionMap;
let character = {};
let gravity = {};
let floor = {};
let platform_one;
let coin_one;

let coin, platform, pitfall, winBarrier;

let enemy;

let jumpEffect, coinEffect, victoryEffect;

/// ======== Concrete methods for p5  ========

function preload()
{
   soundFormats('mp3');

   jumpEffect = loadSound('static/sounds/jump.mp3');
   jumpEffect.setVolume(0.2);

   coinEffect = loadSound('static/sounds/coin.mp3');
   coinEffect.setVolume(0.150);

   victoryEffect = loadSound('./static/sounds/victory.mp3');
   victoryEffect.setVolume(0.3);
}

function setup()
{

   createCanvas(1200, 680);

   directionMap = createDirectionMap();


   floor = (height * 7/8);

   gravity = createVector(0, (1/14));

   character = new Character(100,300, 8, 4);

   character.jumpingsound = jumpEffect;

   rules.character = character;

   rules.victorysound = victoryEffect;

   coin = new Coin(450, floor - 10, 2);
   
   coin_one = new Coin(733, floor - 288, 2);

   coin.pickedsound = coinEffect;
   coin_one.pickedsound = coinEffect;

   platform = new Platform(350, floor - 92, 2);

   platform_one = new Platform(530, floor - 155, 2);

   pitfall = new Pitfall(815, floor, 2);

   enemy = new Enemy(265, floor, 2);

   winBarrier = new WinBarrier(1120, floor, 2);

   winBarrier.victorysound = victoryEffect;

   limits.setDefault(floor, 16);

   limits.setDefaultX(0, 1200);

	background(100,155,255); //fill the sky blue
}


function draw()
{

   if(rules.hasDied || rules.hasWon)
   {
      console.log("The player has died!");
      rules.endGame();
      return;
   }

   clear();
   background(100,155,255);

   /// ======== Draw the world  ========

   stroke(30);
	strokeWeight(3);

	fill(0,155,83);
	rect(0, floor, width, height - floor);


   pitfall.draw();
   coin.draw();
   coin_one.draw();
   platform.draw();
   enemy.draw();
   winBarrier.draw();
   platform_one.draw();

   character.draw();

   /// ======== Calculate collisions ======== 

   platform.getLimits(character.transform, character.crown());
   platform_one.getLimits(character.transform, character.crown());

   coin.getLimits(character.transform);
   coin_one.getLimits(character.transform);

   enemy.getLimits(character.transform);
   pitfall.getLimits(character.transform);
   winBarrier.getLimits(character.transform);


   if(character.transform.y < limits.min)
   {
      console.log(limits.min);

      character.isGrounded = false;
      character.addForce(gravity);
   }
   else
   {
      character.transform.y = limits.min;
      character.velocity.y = 0;
      character.isGrounded = true;
   }
}


function keyPressed()
{
   if(!character)
      return;

   if(rules.hasDied || rules.hasWon)
   {
      location.reload();
   }

   if(directionMap.get(key) !== undefined)
      character.setDirection(directionMap.get(key));
}

function keyReleased()
{
   if(!character)
      return;

   if(directionMap.get(key) !== undefined)
      character.unsetDirection(directionMap.get(key));
}

// ========= Add the p5 engine =========

let library = document.createElement("script");

library.src = "./src/p5.js";

library.onload = () =>
{

   let library = document.createElement("script");

   library.src = "./src/p5.sound.min.js";

   // Add to the context the concrete implementations
   library.onload = () =>
   {
      window.preload = preload;
      window.setup = setup;
      window.draw = draw;

      window.keyPressed = keyPressed;
      window.keyReleased = keyReleased;
   }

   document.body.appendChild(library);
};

document.body.appendChild(library);
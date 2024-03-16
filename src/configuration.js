import {Object, LEFT_KEY, RIGHT_KEY, JUMP_KEY, FORWARD, BACKWARD, UPWARD} from './base.js'


function createDirectionMap()
{
   let directionMap = new Map();

   directionMap.set(LEFT_KEY, createVector(...BACKWARD));
   directionMap.set(RIGHT_KEY, createVector(...FORWARD));
   directionMap.set(JUMP_KEY, createVector(...UPWARD));

   return directionMap;
}

let rules =
{
   isInvulnerable: false,
   hasFallen: false,
   hasDied: false,
   hasWon: false,

   // {Character}
   character : {},

   // {p5.Vector}
   respawnPoint : {},

   delay : 2340,
   totalLifes: 3,


   recount: function(rules)
   {
      rules.isInvulnerable = false;
      rules.character.isInvulnerable = false;

      if(rules.totalLifes == 0)
      {
         rules.hasDied = true;
         return; // Avoid respawning in case has fallen
      }

      if(rules.hasFallen)
         rules.respawn();
   },

   hurt: function()
   {
      if(this.hasFallen && this.isInvulnerable)
         this.delay = 1600;

      if(this.isInvulnerable)
         return;

      console.log("The player has been hurted");

      // Finish the game

      this.totalLifes--;

      this.isInvulnerable = true;
      this.character.isInvulnerable = this.isInvulnerable;

      if(this.totalLifes === 0)
         this.delay = 1450;

      setTimeout(this.recount,this.delay,this);
   },

   endGame: function()
   {
      if(this.hasDied)
      {
         fill(25);
         textSize(45);

         push();

         textAlign(CENTER);

         text("Game over!",width / 2 , height / 2);

         text("Press any key to restart",width /2, (height / 2) + 55);

         pop();

         this.totalLifes = 3;
      }
      else if(this.hasWon)
      {
         this.winGame();
      }
   },

// {p5.Sound}
   victorysound : {},
   winGame: function()
   {
      push();

      textAlign(CENTER);

      fill(25);
      textSize(45);

      text("You win!",width / 2 , height / 2);

      text("Press any key to restart",width /2, (height / 2) + 55);


      pop();
   },

   respawn: function()
   {
      this.hasFallen = false;

      limits.reset();

      this.character.velocity.y = 0;
      this.character.velocity.x = 0;

      this.character.transform.x = this.respawnPoint.x;
      this.character.transform.y = this.respawnPoint.y;

      this.character.mustBlock = false;
   },
};


let limits =
{
   setDefault: function(min, max)
   {
      this.minDefault = min;
      this.maxDefault = max;

      this.min = this.minDefault;
      this.max = this.maxDefault;
   },

   setDefaultX: function(min, max)
   {
      this.minDefaultX = min;
      this.maxDefaultX = max;

      this.minX = this.minDefaultX;
      this.maxX = this.maxDefaultX;

   },

   setMax : function(max)
   {
      this.max = max === 0 ? maxDefault : max;
   },

   setMaxX: function(max)
   {
      this.maxX = max;
   },

   setMin : function(min)
   {
      console.log(`Min Y modified -> ${min}`);
      this.min = min;
   },

   setMinX: function(min)
   {
      this.minX = min;
   },

   reset: function()
   {
      this.min = this.minDefault;
      this.max = this.maxDefault;

      this.minX = this.minDefaultX;
      this.maxX = this.maxDefaultX;
   }
};


class Character extends Object
{

   OFFSET = 18;
   SPINE_LENGTH = 34;

   HEAD_DIAMETER = 18;

   CHEST_LENGTH = (this.SPINE_LENGTH / 2) + 2;
   HAND_LENGTH = 12

   LEG_LENGTH = 14;

   DELTA = 10;


// {String}
   state;

// {Boolean}
// Use to block the input in certain moments
   mustBlock;

// {Boolean}
   isGrounded;

// {Boolean}
   isInvulnerable;

// {p5.Sound}
   jumpingsound;
// {Number}
   speed;

   constructor(x,y, speed, velocityMultiplier)
   {
      super(x, y, velocityMultiplier);

      this.state = "idle";
      this.speed = speed;
   }

   crown = function() 
   {
      return this.transform.y - this.SPINE_LENGTH - this.HEAD_DIAMETER * 2 + 4 ;
   }

   left()
   {
      if(this.isInvulnerable)
      {
         if(frameCount % 4 == 0)
         {
            return;
         }
      }
        //Spine
      stroke(0);
      line(this.transform.x, this.transform.y - this.OFFSET,  this.transform.x, (this.transform.y - this.OFFSET) - this.SPINE_LENGTH); 

      //Left leg
      line(this.transform.x, this.transform.y - this.OFFSET,  this.transform.x - 8, this.transform.y); 

      //Rigth leg
      line(this.transform.x, this.transform.y - this.OFFSET,  this.transform.x + 9, this.transform.y); 

      //Head
      circle(this.transform.x, this.transform.y - this.SPINE_LENGTH - this.HEAD_DIAMETER - 4, this.HEAD_DIAMETER);

      //Left arm
      line(this.transform.x, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH,  this.transform.x - this.HAND_LENGTH + 2, ((this.transform.y - this.OFFSET) - this.CHEST_LENGTH) + 11); 

      //Right arm
      line(this.transform.x, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH,  this.transform.x + this.HAND_LENGTH - 8, ((this.transform.y - this.OFFSET) - this.CHEST_LENGTH) + 13); 
      //Shadow
      fill(134);
      noStroke();
      ellipse(this.transform.x, this.transform.y + 6, 40,10);

   };

   right()
   {
      if(this.isInvulnerable)
      {
         if(frameCount % 4 == 0)
         {
            return;
         }
      }
      stroke(0);
      line(this.transform.x, this.transform.y - this.OFFSET,  this.transform.x, (this.transform.y - this.OFFSET) - this.SPINE_LENGTH); 

      //Left leg
      line(this.transform.x, this.transform.y - this.OFFSET,  this.transform.x - 8, this.transform.y); 

      //Rigth leg
      line(this.transform.x, this.transform.y - this.OFFSET,  this.transform.x + 9, this.transform.y); 

      //Head
      circle(this.transform.x, this.transform.y - this.SPINE_LENGTH - this.HEAD_DIAMETER - 4, this.HEAD_DIAMETER);

      //Right arm
      line(this.transform.x, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH,  this.transform.x + this.HAND_LENGTH - 2, ((this.transform.y - this.OFFSET) - this.CHEST_LENGTH) + 11); 

      //Left arm
      line(this.transform.x, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH,  this.transform.x - this.HAND_LENGTH + 8, ((this.transform.y - this.OFFSET) - this.CHEST_LENGTH) + 13); 

      //Shadow
      fill(134);
      noStroke();
      ellipse(this.transform.x, this.transform.y + 6, 40,10);
   }

   jumping()
   {
      if(this.isInvulnerable)
      {
         if(frameCount % 4 == 0)
         {
            return;
         }
      }
      stroke(0);
      line(this.transform.x, this.transform.y - this.OFFSET,  this.transform.x, (this.transform.y - this.OFFSET) - this.SPINE_LENGTH); 

      //Left leg
      line(this.transform.x, this.transform.y - this.OFFSET,  (this.transform.x - this.LEG_LENGTH / 2) - 3, this.transform.y - 6); 
      line((this.transform.x - this.LEG_LENGTH / 2) - 3, this.transform.y - 6,  this.transform.x - this.LEG_LENGTH / 2 , this.transform.y); 

      //Rigth leg
      line(this.transform.x, this.transform.y - this.OFFSET,  (this.transform.x + this.LEG_LENGTH / 2) + 3, this.transform.y - 6); 
      line((this.transform.x + this.LEG_LENGTH / 2) + 3, this.transform.y - 6,  this.transform.x + this.LEG_LENGTH / 2 , this.transform.y); 

      //Head
      circle(this.transform.x, this.transform.y - this.SPINE_LENGTH - this.HEAD_DIAMETER - 4, this.HEAD_DIAMETER);

      //Right arm
      line(this.transform.x, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH,  this.transform.x + this.HAND_LENGTH, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH - this.DELTA); 

      //Left arm
      line(this.transform.x, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH,  this.transform.x - this.HAND_LENGTH, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH - this.DELTA); 

      //Shadow
      fill(134);
      noStroke();
      ellipse(this.transform.x, this.transform.y + 6, 40,10);
   }

   falling()
   {
      if(this.isInvulnerable)
      {
         if(frameCount % 4 == 0)
         {
            return;
         }
      }
      stroke(0);
      line(this.transform.x, this.transform.y - this.OFFSET,  this.transform.x, (this.transform.y - this.OFFSET) - this.SPINE_LENGTH); 

      //Left leg
      line(this.transform.x, this.transform.y - this.OFFSET,  (this.transform.x - this.LEG_LENGTH / 2) - 3, this.transform.y - 6); 
      line((this.transform.x - this.LEG_LENGTH / 2) - 3, this.transform.y - 6,  this.transform.x - this.LEG_LENGTH / 2 , this.transform.y); 

      //Rigth leg
      line(this.transform.x, this.transform.y - this.OFFSET,  (this.transform.x + this.LEG_LENGTH / 2) + 3, this.transform.y - 6); 
      line((this.transform.x + this.LEG_LENGTH / 2) + 3, this.transform.y - 6,  this.transform.x + this.LEG_LENGTH / 2 , this.transform.y); 

      //Head
      circle(this.transform.x, this.transform.y - this.SPINE_LENGTH - this.HEAD_DIAMETER - 4, this.HEAD_DIAMETER);

      //Right arm
      line(this.transform.x, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH,  this.transform.x + this.HAND_LENGTH, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH - this.DELTA); 

      //Left arm
      line(this.transform.x, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH,  this.transform.x - this.HAND_LENGTH, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH - this.DELTA); 

      //Shadow
      fill(134);
      noStroke();
      ellipse(this.transform.x, this.transform.y + 6, 40,10);
   }

   idle()
   {
      if(this.isInvulnerable)
      {
         if(frameCount % 4 == 0)
         {
            return;
         }
      }
      //Spine
      stroke(0);
      line(this.transform.x, this.transform.y - this.OFFSET,  this.transform.x, (this.transform.y - this.OFFSET) - this.SPINE_LENGTH); 

      //Left leg
      line(this.transform.x, this.transform.y - this.OFFSET,  this.transform.x - 14, this.transform.y); 

      //Rigth leg
      line(this.transform.x, this.transform.y - this.OFFSET,  this.transform.x + 14, this.transform.y); 

      //Head
      circle(this.transform.x, this.transform.y - this.SPINE_LENGTH - this.HEAD_DIAMETER - 4, this.HEAD_DIAMETER);

      //Left arm
      line(this.transform.x, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH,  this.transform.x + this.HAND_LENGTH, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH); 

      //Right arm
      line(this.transform.x, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH,  this.transform.x - this.HAND_LENGTH, (this.transform.y - this.OFFSET) - this.CHEST_LENGTH); 

      //Shadow
      fill(134);
      noStroke();
      ellipse(this.transform.x, this.transform.y + 6, 40,10);
   }

   playSound()
   {
      this[this.state+"sound"]?.play();
   }

   *addContinuousForce(vector)
   {
      let acc = 16 / this.speed; // Acceleration

      // {p5.Vector}
      let force = p5.Vector.mult(vector, acc);

      while(abs(this.velocity.y) < limits.max)
      {
         this.velocity.add(force);
         yield this.velocity;
      }

      while(abs(this.velocity.y) > 0)
      {
         this.velocity.sub(force);
         yield this.velocity;
      }
   }

   setDirection(vector)
   {
      if(this.mustBlock)
         return;

      if(vector.y < 0 && !this.isGrounded)
         return;

      if(vector.y < 0)
      {
         this.coroutine = this.addContinuousForce(vector);
         this.state = "jumping";
         this.playSound();
         return;
      }

      this.addForce(vector);
   }

   unsetDirection(vector)
   {
      if(this.mustBlock)
         return;

      if(vector.y < 0)
         return;

      //console.log(`${this.transform.x} >= ${limits.maxX} ${this.transform.x >= limits.maxX}`);

      if(this.transform.x >= limits.maxX || this.transform.x <= limits.minX)
         return;

      console.log("Unsetting direction");

      this.subForce(vector);
   }


   setColor()
   {
      fill(0);
      strokeWeight(2);
   }


   draw()
   {
      this.setColor();

      if(this.coroutine !== undefined)
      {
         let result = this.coroutine.next().value;

         if(!result)
         {
            this.coroutine = undefined;
         }
      }


      //console.log(this.transform.x >= limits.maxX);
      if((this.velocity.x < 0 && this.transform.x <= limits.minX))
      {
         this.transform.x = limits.minX;
         this.velocity.x = 0;
      }

      if((this.velocity.x > 0 && this.transform.x >= limits.maxX))
      {
         this.transform.x = limits.maxX;
         this.velocity.x = 0;
      }

      this.transform.add(this.velocity); // Adds force to the body

      //point(this.transform.x, this.transform.y);

      if(this.velocity.x < 0)
      {
         this.state = "left";
      }
      else if(this.velocity.x > 0)
      {
         this.state = "right";
      }
      else if(this.velocity.x == 0 && this.velocity.y == 0)
      {
         this.state = "idle";
      }
      else if(this.velocity.y < 0 )
      {
         this.state = "jumping";
      }
      else if(this.velocity.y > 0)
      {
         this.state = "falling";
      }

      this[this.state](); // Draw the current state
   }
}


class Coin extends Object
{
// {String}
   state; 
// {Number}
   diameter = 30;
// {Number}
   threshold = 2;

// {Sound}
   pickedsound;

   draw()
   {
      if(this.state === "picked")
         return;

      stroke(0);
      fill(250, 255, 80);
      circle(this.transform.x, this.transform.y, this.diameter);

      noStroke();

      fill(100, 100, 100, 140);
      ellipse(this.transform.x, this.transform.y + 20, 40, 3);
   }

   getLimits(transform)
   {
      if(this.state === "picked")
         return;

      if(p5.Vector.dist(transform, this.transform) + this.diameter <= this.threshold || p5.Vector.dist(transform, this.transform) - this.diameter <= this.threshold)
      {
         this.state = "picked";
         this.pickedsound?.play();
      }
   }
}

class Platform extends Object
{
   width = 100;
   height = 22;

   draw()
   {
      stroke(0);
      fill(120,45,80);
      rect(this.transform.x, this.transform.y, this.width, this.height, 20, 20, 20, 20);
   }

   getLimits(position, top)
   {
      if(position.x >= this.transform.x && position.x <= (this.transform.x + 100))
      {
         registerCollission(this);

//         fill(255,0,0,100);
//         rect(this.transform.x, this.transform.y + 22,  this.width, (height * (7/8)) - this.transform.y - 20);

         if(position.y < (this.transform.y + this.height))
         {

//            rect(this.transform.x, this.transform.y - this.height,  this.width, this.transform.y - (this.transform.y - this.height));

            limits.setMin(this.transform.y);
         }

         if(top > this.transform.y + this.height)
         {
            limits.setMax(top - (this.transform.y + this.height));

//            stroke(2);
//            fill(0);
//            line(position.x, top, this.transform.x, (this.transform.y + this.height));
         }

      }
      else
         unregisterCollission(this);

 //     if(top < (this.transform.y + this.height) && top > this.transform.y)
 //     {
 //        fill(0,255,0,100);
 //        rect(this.transform.x - 70, this.transform.y, 70, this.height);
 //     }
   }
}

class Pitfall extends Object 
{
// {Number}
   height = height - this.transform.y;
// {Number}
   width = 60;
// {Number}
   roundness = 100;

   draw()
   {
      stroke(100,155,255);
      strokeWeight(4);
      fill(100,155,255);
      rect(this.transform.x + 5, this.transform.y, 145, this.height);

      fill(0,155,83);
      stroke(30);
      strokeWeight(3);

      rect(this.transform.x, this.transform.y, this.width, this.height, 0, this.roundness, 0, 0);

      rect((this.transform.x + 125), this.transform.y, this.width, this.height, this.roundness, 0, 0, 0);
   }

   getLimits(transform)
   {
      if(transform.x >= (815 + 60 - 10) && transform.x <= this.transform.x + 125)
      {
         registerCollission(this);


         if(transform.y >= this.transform.y)
         {
            rules.hasFallen = true;
            rules.respawnPoint = this.transform;

            rules.character.mustBlock = true;
            rules.character.velocity.x = 0;

            rules.hurt();
            limits.setMin(780);
         }

         return;
      }

      unregisterCollission(this);
   }
}

class Enemy extends Object
{
// {Number}
   width =  50;
// {Number}
   height = 50;

// {Number}
   pointA;

// {Number}
   pointB;

   constructor(x, y, velocityMultiplier)
   {
      super(x, y , velocityMultiplier);

      this.pointA = x;

      this.pointB = this.pointA + 180;
   }


   draw()
   {
      if(this.transform.x === this.pointB)
      {
         this.addForce(createVector(-1,0));
      }
      else if(this.transform.x === this.pointA || this.velocity.x === 0) // If it is static start
      {
         this.addForce(createVector(1,0));
      }

      this.transform.add(this.velocity);

      push();

      stroke(10);
      strokeWeight(3);

      fill(184, 8, 0);
      rectMode(CENTER);
      rect(this.transform.x, this.transform.y - this.height / 2, this.width, this.height);

      triangle(this.transform.x - this.width / 2, this.transform.y - this.height , this.transform.x - (this.width / 2) + 10, this.transform.y - this.height - 10, this.transform.x - (this.width / 2) + 20, this.transform.y - this.height );

      pop();
   }


   getLimits(transform)
   {
      if(transform.x >= this.transform.x - (this.width / 2) 
         && transform.x <= this.transform.x + (this.width / 2))
      {
         registerCollission(this);

         if(transform.y < this.transform.y - this.height)
         {
            limits.setMin(this.transform.y - this.height);
            limits.setDefaultX(0,1200);

            return; // Avoid hurt the player if it is in a legal position
         }


         if((transform.x >= this.transform.x - (this.width / 2) && transform.x <= this.transform.x - (this.width / 2) + 2) && transform.y > this.transform.y - this.height)
         {
            //console.log("Colliding with the left of the enemy");

            rules.hurt();
            limits.setMaxX(this.transform.x - (this.width / 2));
            return;
         }

         if((transform.x <= this.transform.x + (this.width / 2) && transform.x >= this.transform.x + (this.width/2) - 2) && transform.y > this.transform.y - this.height)
         {
            rules.hurt();
            limits.setMinX(this.transform.x + (this.width / 2));
            return;
         }


      }
      else
         unregisterCollission(this);
   }
}

let lastColl = undefined;

function registerCollission( current )
{
   if(!lastColl)
   {
      lastColl = current;
      return;
   }

   // Override if the current is higher than the last
   if(current.transform.y > lastColl.transform.y)
      lastColl = current;
}

function unregisterCollission( objct )
{
   if(lastColl !== objct)
      return;

//   console.log(`Unregistering the collision of the:`);
//   console.log(lastColl);

   limits.reset();
   lastColl = undefined;
}


class WinBarrier extends Object
{
   victorysound;

   draw()
   {
      push();
      strokeWeight(6);
      stroke(190,200,33);

      line(this.transform.x, this.transform.y - 180, this.transform.x, this.transform.y);

      fill(0);
      triangle(this.transform.x, this.transform.y - 180, this.transform.x + 35, this.transform.y - 165, this.transform.x, this.transform.y - 145);
      pop();
   }

   getLimits(transform)
   {
      if(transform.x >= this.transform.x)
      {
         rules.hasWon = true;
         this.victorysound?.play();
      }
   }
}

export {Pitfall, Platform, WinBarrier, Coin, Character, Enemy, limits, rules, createDirectionMap};

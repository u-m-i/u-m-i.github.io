const LEFT_KEY = "a";
const RIGHT_KEY = "d";
const JUMP_KEY = "w";

const FORWARD = [1,0];
const BACKWARD = [-1,0];
const UPWARD =  [0,-1];

class Object
{
// {p5.Vector}
   transform;

// {p5.Vector}
   velocity;

// {Number}
   multiplier;

   constructor(x, y, velocityMultiplier)
   {
      this.transform = createVector(x, y);

      this.multiplier = velocityMultiplier;

      // Start with a neutral velocity
      this.velocity = createVector(0, 0);
   }

   /**
    * Adds a unitary vector amplified to the velocity of the object
    * @param {p5.Vector} vector 
    */
   addForce(vector)
   {
      let amplification  = p5.Vector.mult(vector, this.multiplier);

      this.velocity.add(amplification);
   }

   /**
    * Substract a unitary vector amplified to the velocity of the object
    * @param {p5.Vector} vector 
    */
   subForce(vector)
   {
      let amplification  = p5.Vector.mult(vector, this.multiplier);

      this.velocity.sub(amplification);
   }
}

export {Object, LEFT_KEY, RIGHT_KEY, JUMP_KEY, FORWARD, BACKWARD, UPWARD};
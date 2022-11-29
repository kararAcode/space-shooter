// OOP Pair Programming Starter Code
// Your Names
// The Date


// ------------------------------------------------------------------------- //
// You don't need to edit this section...

let bulletAR = [];
let alienAR = [];
let enterprise;
let shipImage, bulletImage, alienImg, laser, death;
let start = false;

function preload() {
  shipImage = loadImage("assets/enterprise.png");
  bulletImage = loadImage("assets/laser-shot.png");
  alienImg = loadImage("assets/alien.png");
  laser = loadSound("assets/laser1.wav");
  death = loadSound("assets/Death.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  enterprise = new Ship(width/2, height/2, shipImage);
  setInterval(() => {
    alienAR.push(new Alien(random(width), random(enterprise.y), alienImg));
  }, 1);
}

function draw() {
  background("black");
  enterprise.update();
  enterprise.display();
  alienAR.forEach((alien) => {
    alien.update();
    alien.display();
  });

    

  
}

function keyPressed() {

  if (keyCode === 32){
    laser.play();

    bulletAR.push(new Bullet(enterprise.x + shipImage.width/2, enterprise.y, 0, -5, bulletImage));
  }
  
  
}

// ------------------------------------------------------------------------- //
// Start editing here!

class Ship {
  constructor(x, y, theImage) {
    // define the variables needed for this ship
    this.x = x;
    this.y = y;
    this.img = theImage;
    this.dx = 5;
    this.dy = 5;
  }

  update() {
    // move ship -- you might want to use the keyIsDown() function here
    this.handleKeyPress();
    // if doing extra for experts, show bullet(s)
    bulletAR.forEach((bullet) => {
      bullet.update();
      bullet.display();
    });

  }

  display() {
    // show the ship

    image(this.img, this.x, this.y);

  }

  handleKeyPress() {
    // you only need to use this if you are doing the extra for experts...
    // if you are, you should make a bullet if the space key was pressed

    if (keyIsDown(87)) {
      this.y -= this.dy;
    }

    if (keyIsDown(83)) {
      this.y += this.dy;
    }

    if (keyIsDown(65)) {
      this.x -= this.dx;
    }

    if (keyIsDown(68)) {
      this.x += this.dx;
    }

    
  }
}

// ------------------------------------------------------------------------- //

// Extra for Experts 
//  - you can instantiate a bullet (or a bullet array) within the Ship class,
//    and call the display and update functions in the logical location of the 
//    Ship class. If you create an array of bullets, you might want to think about
//    when the bullets should be removed from the array...

class Bullet {
  constructor(x, y, dx, dy, theImage) {
    // define the variables needed for the bullet here
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.img = theImage;

  }

  update() {
    // what does the bullet need to do during each frame? how do we know if it is off screen?
    this.y += this.dy;
    if (!this.isOnScreen()){
      bulletAR.splice(bulletAR.indexOf(this), 1);
    }
  }

  display() {
    // show the bullet
    imageMode(CENTER);
    image(this.img, this.x, this.y);
    imageMode(CORNER);
  }

  isOnScreen() {
    // check if the bullet is still on the screen
    return this.y > 0;
  }
}


class Alien {
  constructor(x, y, theImage){
    this.x = x;
    this.y = y;
    this.img = theImage;
    this.dx = 7;
    this.time = random(5000);
  }

  display(){
    image(alienImg, this.x, this.y, 50, 50);
  }


  update(){
    if (this.isColliding()){
      alienAR.splice(alienAR.indexOf(this), 1);
    }
    this.x = noise(this.time) * width;
    this.time += 0.007;
  }
  

  isColliding(){
    for (let i = 0; i < bulletAR.length; i++) {
      if (collideRectRect(bulletAR[i].x, bulletAR[i].y, bulletImage.width, bulletImage.height, this.x, this.y, 50, 50)) {
        bulletAR.splice(i, 1);
        death.play();
        return true;
      }
    }
    return false;
  }
}

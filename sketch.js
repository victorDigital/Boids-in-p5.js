let boids = [];
let sharks = [];

let border = 50;

let prob1 = 5;
let prob2 = 30;
let prob3 = 35;
let prob4 = 20;
let prob5 = 8;
let prob6 = 10;

function instantiateBoids(num, _boid) {
  for(let i = 0 ; i < num ; i++) {
    let b = new boid(random(width), random(height), random(-1,1), random(-1,1));
    boids.push(b);
  }
}

function instantiateSharks(num, _shark) {
  for(let i = 0 ; i < num ; i++) {
    let s = new shark(random(width), random(height), random(-1,1), random(-1,1));
    sharks.push(s);
  }
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  stroke(255);
  strokeWeight(10);
  instantiateBoids(50, boid)
  instantiateSharks(15, shark)
}

function draw() {
  background(13);
  if (mouseIsPressed === true) {
    boids.push(new boid(mouseX, mouseY, random(-1,1), random(-1,1)));
  }

  for(let i = 0 ; i < boids.length ; i++) {
    boidDraw(boids[i]);
    boidMaxSpeed(boids[i]);
    updateBoid(boids[i]);
    boidBorder(boids[i]);
    boidCohesion(boids[i], boids);
    boidAlignment(boids[i], boids);
    boidSepration(boids[i], boids)
    boidFlee(boids[i], sharks);
  }

  for(let i = 0 ; i < sharks.length ; i++) {
    sharkDraw(sharks[i]);
    sharkMaxSpeed(sharks[i]);
    updateShark(sharks[i]);
    sharkBorder(sharks[i]);
    sharkAttack(sharks[i], boids);
    sharkSepration(sharks[i]);
  }
}

function boidSepration(_boid, boidArr=[]) {
  let seprationRange = 30;
  let boidsInProximity = [];

  for(let i = 0; i < boidArr.length;  i++) {
    if(dist(_boid.x, _boid.y, boidArr[i].x, boidArr[i].y) < seprationRange) {
      if(_boid.x != boidArr[i].x || _boid.y != boidArr[i].y) {
        boidsInProximity.push(boidArr[i]);
      }
    }
  }
  let targetpoint = createVector();
  for(let i = 0; i < boidsInProximity.length; i++) {
    targetpoint.add(boidsInProximity[i].x,boidsInProximity[i].y);
  }
  targetpoint.div(boidsInProximity.length);
  if(targetpoint.x != 0) {
    if(_boid.x > targetpoint.x) {_boid.dx += 1 /prob1}
    if(_boid.y < targetpoint.y) {_boid.dy -= 1 /prob1}
    if(_boid.x < targetpoint.x) {_boid.dx -= 1 /prob1}
    if(_boid.y > targetpoint.y) {_boid.dy += 1 /prob1}
  }
}

function boidAlignment(_boid, boidArr=[]) {
  let alignmentRange = 60;
  let boidsInProximity = [];

  for(let i = 0; i < boidArr.length;  i++) {
    if(dist(_boid.x, _boid.y, boidArr[i].x, boidArr[i].y) < alignmentRange) {
      boidsInProximity.push(boidArr[i]);
    }
  }

  //steer in direction of the avg of the steering vectors of the boids in proximity
  let steeringVector = createVector();
  for(let i = 0; i < boidsInProximity.length; i++) {
    steeringVector.add(boidsInProximity[i].dx,boidsInProximity[i].dy);
    steeringVector.add(random(-1,1),random(-1,1));
  }
  steeringVector.div(boidsInProximity.length);
  if(_boid.x < steeringVector.x+_boid.x) {_boid.dx += 1 /prob2}
  if(_boid.x > steeringVector.x+_boid.x) {_boid.dx -= 1 /prob2}
  if(_boid.y < steeringVector.y+_boid.y) {_boid.dy += 1 /prob2}
  if(_boid.y > steeringVector.y+_boid.y) {_boid.dy -= 1 /prob2}
}

function boidMaxSpeed(_boid) {
  if(_boid.dx > 2) {_boid.dx = 2;}
  if(_boid.dy > 2) {_boid.dy = 2;}
  if(_boid.dx < -2) {_boid.dx = -2;}
  if(_boid.dy < -2) {_boid.dy = -2;}
}

function boidCohesion(_boid, boidArr=[]) {
  //find boids in close proximity!
  let cohesionRange = 50;
  let boidsInProximity = [];

  for(let i = 0; i < boidArr.length;  i++) {
    if(dist(_boid.x, _boid.y, boidArr[i].x, boidArr[i].y) < cohesionRange) {
      boidsInProximity.push(boidArr[i]);
    }
  }
  //find avg pos of boidsInProximity
  let targetpoint = createVector();
  for(let i = 0; i < boidsInProximity.length; i++) {
    targetpoint.add(boidsInProximity[i].x,boidsInProximity[i].y);
  }
  targetpoint.div(boidsInProximity.length);
  if(_boid.x < targetpoint.x) {_boid.dx += 1 /prob3}
  if(_boid.x > targetpoint.x) {_boid.dx -= 1 /prob3}
  if(_boid.y < targetpoint.y) {_boid.dy += 1 /prob3}
  if(_boid.y > targetpoint.y) {_boid.dy -= 1 /prob3}
}

function boidFlee(_boid, sharks) {
  let sharkRange = 70;
  let sharksInProximity = [];
  for(let i = 0 ; i < sharks.length ; i++) {
    if(dist(_boid.x, _boid.y, sharks[i].x, sharks[i].y) < sharkRange) {
      sharksInProximity.push(sharks[i]);
    }
  }
  if(sharksInProximity.length > 0) {
    let targetpoint = createVector();
    for(let i = 0; i < sharksInProximity.length; i++) {
      targetpoint.add(sharksInProximity[i].x,sharksInProximity[i].y);
    }
    targetpoint.div(sharksInProximity.length);
    if(_boid.x < targetpoint.x) {_boid.dx -= 1 /prob5}
    if(_boid.x > targetpoint.x) {_boid.dx += 1 /prob5}
    if(_boid.y < targetpoint.y) {_boid.dy -= 1 /prob5}
    if(_boid.y > targetpoint.y) {_boid.dy += 1 /prob5}
  }
}

function updateBoid(_boid) {
  _boid.x += _boid.dx ;
  _boid.y += _boid.dy ;
}

function boidBorder(_boid) {
  stroke(255,0,0);
  noFill();
  rect(0,0,width,height);
  strokeWeight(2);
  stroke(0,255,0);
  noFill();
  rect(0+border,0+border,width -(border*2),height-(border*2));
  stroke(255);
  strokeWeight(10);

  if(_boid.x <= border) {
    _boid.dx += 1 /2;
  }
  if(_boid.y <= border) {
    _boid.dy += 1 /2;
  }
  if(_boid.x >= width - border) {
    _boid.dx -= 1 /2;
  }
  if(_boid.y >= height - border) {
    _boid.dy -= 1 /2;
  }
}

function boidDraw(_boid) {
  point(_boid.x,_boid.y);
  strokeWeight(2);
  line(_boid.x,_boid.y,_boid.x+_boid.dx*4,_boid.y+_boid.dy*4)
  strokeWeight(10);
}

class boid {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }
}

//make a shark that wants to eat the boids

class shark {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }
}

function sharkDraw(_shark) {
  stroke(255,0,0);
  strokeWeight(10);
  noFill();
  point(_shark.x,_shark.y);
  strokeWeight(2);
  line(_shark.x,_shark.y,_shark.x+_shark.dx*4,_shark.y+_shark.dy*4)
  strokeWeight(10);
  stroke(255)
}

function updateShark(_shark) {
  _shark.x += _shark.dx ;
  _shark.y += _shark.dy ;
}

function sharkBorder(_shark) {
  stroke(255,0,0);
  noFill();
  rect(0,0,width,height);
  strokeWeight(2);
  stroke(0,255,0);
  noFill();
  rect(0+border,0+border,width -(border*2),height-(border*2));
  stroke(255);
  strokeWeight(10);

  if(_shark.x <= border) {
    _shark.dx += 1 /5;
  }
  if(_shark.y <= border) {
    _shark.dy += 1 /5;
  }
  if(_shark.x >= width - border) {
    _shark.dx -= 1 /5;
  }
  if(_shark.y >= height - border) {
    _shark.dy -= 1 /5;
  }
}

function sharkMaxSpeed(_shark) {
  if(_shark.dx > 2.2) {_shark.dx = 2.2}
  if(_shark.dy > 2.2) {_shark.dy = 2.2}
  if(_shark.dx < -2.2) {_shark.dx = -2.2}
  if(_shark.dy < -2.2) {_shark.dy = -2.2}
}

function sharkAttack(_shark, _boids) {
  let sharkRange = 120;
  let boidsInProximityToShark = [];
  for(let i = 0; i < boids.length; i++) {
    if(dist(_shark.x, _shark.y, boids[i].x, boids[i].y) < sharkRange) {
      boidsInProximityToShark.push(boids[i]);
    }
  }
  if(boidsInProximityToShark.length > 0) {
    let targetpoint = createVector();
    //find only the closest boid
    for(let i = 0; i < boidsInProximityToShark.length; i++) {
      if(dist(_shark.x, _shark.y, boidsInProximityToShark[i].x, boidsInProximityToShark[i].y) < dist(_shark.x, _shark.y, targetpoint.x, targetpoint.y)) {
        targetpoint.set(boidsInProximityToShark[i].x,boidsInProximityToShark[i].y);
      }
    }
    //if the shark is close to the boid, eat it
    for(let i = 0; i < _boids.length; i++) {
      if(dist(_shark.x, _shark.y, _boids[i].x, _boids[i].y) < 10) {
        print("EAT:" + str(i))
        boids.splice(i,1);
      }
    }


    //move towards the closest boid
    if(_shark.x < targetpoint.x) {_shark.dx += 1 /prob4}
    if(_shark.x > targetpoint.x) {_shark.dx -= 1 /prob4}
    if(_shark.y < targetpoint.y) {_shark.dy += 1 /prob4}
    if(_shark.y > targetpoint.y) {_shark.dy -= 1 /prob4}

    stroke(255,0,0);
    strokeWeight(2);
    line(_shark.x,_shark.y,targetpoint.x,targetpoint.y);
    strokeWeight(10);
    stroke(255);
  }

  //if no boids are in range, move randomly
  if(boidsInProximityToShark.length == 0) {
    _shark.dx += random(-0.3,0.3);
    _shark.dy += random(-0.3,0.3);
  }
}

function sharkSepration(_shark) {
  //separate from other sharks in proximity
  let sharksInProximityToShark = [];
  for(let i = 0; i < sharks.length; i++) {
    if(dist(_shark.x, _shark.y, sharks[i].x, sharks[i].y) < 40) {
      sharksInProximityToShark.push(sharks[i]);
    }
  }
  if(sharksInProximityToShark.length > 0) {
    let targetpoint = createVector();
    //find only the avgerage of all the sharks in proximity
    for(let i = 0; i < sharksInProximityToShark.length; i++) {
      targetpoint.add(sharksInProximityToShark[i].x,sharksInProximityToShark[i].y);
    }
    targetpoint.div(sharksInProximityToShark.length);
    //move away from the average of the sharks in proximity
    if(_shark.x < targetpoint.x) {_shark.dx -= 1 / prob6}
    if(_shark.x > targetpoint.x) {_shark.dx += 1 / prob6}
    if(_shark.y < targetpoint.y) {_shark.dy -= 1 / prob6}
    if(_shark.y > targetpoint.y) {_shark.dy += 1 / prob6}
  }
}
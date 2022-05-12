let boids = [];
let sharks = [];

let border = 50;

let prob1 = 8;
let prob2 = 30;
let prob3 = 35;

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
  instantiateBoids(5, boid)
  instantiateSharks(10, shark)
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
  }

  for(let i = 0 ; i < sharks.length ; i++) {
    sharkDraw(sharks[i]);
    sharkMaxSpeed(sharks[i]);
    updateShark(sharks[i]);
    sharkBorder(sharks[i]);

}

function boidSepration(_boid, boidArr=[]) {
  let seprationRange = 60;
  let boidsInProximity = [];

  for(let i = 0; i < boidArr.length;  i++) {
    if(dist(_boid.x, _boid.y, boidArr[i].x, boidArr[i].y) < seprationRange) {
      if(_boid.x != boidArr[i].x || _boid.y != boidArr[i].y) {
        boidsInProximity.push(boidArr[i]);
      }
    }
  }
  let closestBoid = createVector();
  for(let i = 0; i < boidsInProximity.length; i++) {
    closestBoid.add(boidsInProximity[i].x,boidsInProximity[i].y);
  }
  closestBoid.div(boidsInProximity.length);
  if(closestBoid.x != 0) {
    strokeWeight(3);
    stroke(255,0,0,100)
    if( boids.length < 40) {
      line(_boid.x,_boid.y,closestBoid.x,closestBoid.y)
    }
    stroke(255)
    strokeWeight(10);
    if(_boid.x > closestBoid.x) {_boid.dx += 1 /prob1}
    if(_boid.y < closestBoid.y) {_boid.dy -= 1 /prob1}
    if(_boid.x < closestBoid.x) {_boid.dx -= 1 /prob1}
    if(_boid.y > closestBoid.y) {_boid.dy += 1 /prob1}
  }
}

function boidAlignment(_boid, boidArr=[]) {
  let alignmentRange = 120;
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

  stroke(255,255,0,75);
  strokeWeight(2);
  if( boids.length < 40) {
    line(_boid.x,_boid.y,boidsInProximity[0].x,boidsInProximity[0].y);
  }
  strokeWeight(10);
  stroke(255);
}

function boidMaxSpeed(_boid) {
  if(_boid.dx > 2) {_boid.dx = 2;}
  if(_boid.dy > 2) {_boid.dy = 2;}
  if(_boid.dx < -2) {_boid.dx = -2;}
  if(_boid.dy < -2) {_boid.dy = -2;}
}

function boidCohesion(_boid, boidArr=[]) {
  //find boids in close proximity!
  let cohesionRange = 110;
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
  stroke(0,0,255,75);
  strokeWeight(2);
  if( boids.length < 40) {
    line(_boid.x,_boid.y,targetpoint.x,targetpoint.y);
  }
  strokeWeight(10);
  stroke(255);
  if(_boid.x < targetpoint.x) {_boid.dx += 1 /prob3}
  if(_boid.x > targetpoint.x) {_boid.dx -= 1 /prob3}
  if(_boid.y < targetpoint.y) {_boid.dy += 1 /prob3}
  if(_boid.y > targetpoint.y) {_boid.dy -= 1 /prob3}
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
    _boid.dx += 1 /5;
  }
  if(_boid.y <= border) {
    _boid.dy += 1 /5;
  }
  if(_boid.x >= width - border) {
    _boid.dx -= 1 /5;
  }
  if(_boid.y >= height - border) {
    _boid.dy -= 1 /5;
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
  noFill();
  ellipse(_shark.x,_shark.y,20,20);
}

function updateshark(_shark) {
  _shark.x += _shark.dx ;
  _shark.y += _shark.dy ;
}

function sharkborder(_shark) {
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
  if(_shark.dx > 3) {_shark.dx = 3}
  if(_shark.dy > 3) {_shark.dy = 3}
  if(_shark.dx < -3) {_shark.dx = -3}
  if(_shark.dy < -3) {_shark.dy = -3}
}
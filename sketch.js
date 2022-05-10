let boids = [];
let border = 50;

let prob1 = 10;
let prob2 = 30;
let prob3 = 40;

function instantiateBoids(num, _boid) {
  for(let i = 0 ; i < num ; i++) {
    let b = new boid(random(width), random(height), random(-2,2), random(-2,2))
    boids.push(b);
  }
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  stroke(255);
  strokeWeight(10);
  instantiateBoids(50, boid)
}

function draw() {
  background(13);
  for(let i = 0 ; i < boids.length ; i++) {
    boidDraw(boids[i]);
    boidMaxSpeed(boids[i]);
    updateBoid(boids[i]);
    boidBorder(boids[i]);
    boidCohesion(boids[i], boids);
    boidAlignment(boids[i], boids);
    boidSepration(boids[i], boids)
  }
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
    if(dist(mouseX, mouseY, _boid.x, _boid.y) < 200) {
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
  let alignmentRange = 70;
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
  }
  steeringVector.div(boidsInProximity.length);
  if(_boid.x < steeringVector.x+_boid.x) {_boid.dx += 1 /prob2}
  if(_boid.x > steeringVector.x+_boid.x) {_boid.dx -= 1 /prob2}
  if(_boid.y < steeringVector.y+_boid.y) {_boid.dy += 1 /prob2}
  if(_boid.y > steeringVector.y+_boid.y) {_boid.dy -= 1 /prob2}

  stroke(255,255,0,75);
  strokeWeight(2);
  if(dist(mouseX, mouseY, _boid.x, _boid.y) < 200) {
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
  if(dist(mouseX, mouseY, _boid.x, _boid.y) < 200) {
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


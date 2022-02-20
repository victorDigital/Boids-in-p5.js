let boids = [];
let border = 50;

function instantiateBoids(num, _boid) {
  for(let i = 0 ; i < num ; i++) {
    let b = new boid(random(width), random(height), random(-5,5), random(-5,5))
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
    updateBoid(boids[i]);
    boidBorder(boids[i]);
    boidCohesion(boids[i], boids);
    boidAlignment(boids[i], boids);
    boidSepration(boids[i], boids)
    boidMaxSpeed(boids[i]);
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
    stroke(255,0,0)
    line(_boid.x,_boid.y,closestBoid.x,closestBoid.y)
    stroke(255)
    strokeWeight(10);
    if(_boid.x < closestBoid.x) {_boid.dx -= 1 /20}
    if(_boid.x > closestBoid.x) {_boid.dx += 1 /20}
    if(_boid.y < closestBoid.y) {_boid.dy -= 1 /20}
    if(_boid.y > closestBoid.y) {_boid.dy += 1 /20}
  }
}

function boidAlignment(_boid, boidArr=[]) {
  
}

function boidMaxSpeed(_boid) {
  if(_boid.dx > 3) {_boid.dx = 3;}
  if(_boid.dy > 3) {_boid.dy = 3;}
}

function boidCohesion(_boid, boidArr=[]) {
  //find boids in close proximity!
  let cohesionRange = 100;
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
  line(_boid.x,_boid.y,targetpoint.x,targetpoint.y);
  strokeWeight(10);
  stroke(255);
  if(_boid.x < targetpoint.x) {_boid.dx += 1 /20}
  if(_boid.x > targetpoint.x) {_boid.dx -= 1 /20}
  if(_boid.y < targetpoint.y) {_boid.dy += 1 /20}
  if(_boid.y > targetpoint.y) {_boid.dy -= 1 /20}
}

function updateBoid(_boid) {
  _boid.x += _boid.dx;
  _boid.y += _boid.dy;
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
    _boid.dx++;
  }
  if(_boid.y <= border) {
    _boid.dy++;
  }
  if(_boid.x >= width - border) {
    _boid.dx--;
  }
  if(_boid.y >= height - border) {
    _boid.dy--;
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


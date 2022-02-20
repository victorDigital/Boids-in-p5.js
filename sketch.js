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
    point(boids[i].x,boids[i].y);
    updateBoid(boids[i]);
    boidBorder(boids[i]);
    boidCohesion(boids[i], boids);
    boidMaxSpeed(boids[i]);
  }
}

function boidAlignment(_boid, boidArr=[]) {

}

function boidMaxSpeed(_boid) {
  if(_boid.dx > 5) {_boid.dx = 5;}
  if(_boid.dy > 5) {_boid.dy = 5;}
}

function boidCohesion(_boid, boidArr=[]) {
  //find boids in close proximity!
  let cohesionRange = 100;
  let boidsInProximity = [];

  for(let i = 0; i < boidArr.length;  i++) {
    if(dist(_boid.x, _boid.y, boidArr[i].x, boidArr[i].y) < cohesionRange) {
      boidsInProximity.push(boidArr[i]);
      stroke(0,0,255,100);
      strokeWeight(2);
      line(_boid.x,_boid.y,boidArr[i].x,boidArr[i].y);
      strokeWeight(10);
      stroke(255);
    }
  }
  //find avg pos of boidsInProximity
  let targetpoint = createVector();
  for(let i = 0; i < boidsInProximity.length; i++) {
    targetpoint.add(boidsInProximity[i].x,boidsInProximity[i].y);
  }
  targetpoint.div(boidsInProximity.length);
  stroke(0,0,255);
  strokeWeight(2);
  line(_boid.x,_boid.y,targetpoint.x,targetpoint.y);
  strokeWeight(10);
  stroke(255);
  if(_boid.x < targetpoint.x) {_boid.dx += 1 /8}
  if(_boid.x > targetpoint.x) {_boid.dx -= 1 /8}
  if(_boid.y < targetpoint.y) {_boid.dy += 1 /8}
  if(_boid.y > targetpoint.y) {_boid.dy -= 1 /8}
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

class boid {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }
}


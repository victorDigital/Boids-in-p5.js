let boids = [];
let border = 50;

function instantiateBoids(num, _boid) {
  for(let i = 0 ; i < num ; i++) {
    let b = new boid(width/2, height/2, random(-5,5), random(-5,5))
    boids.push(b);
  }
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  stroke(255);
  strokeWeight(10);
  instantiateBoids(20, boid)
}

function draw() {
  background(13);
  for(let i = 0 ; i < boids.length ; i++) {
    point(boids[i].x,boids[i].y);
    updateBoid(boids[i]);
    boisBorder(boids[i]);
    boisCohesion(boids[i], boids);
  }
}

function boisCohesion(_boid, boidArr=[]) {
  //find boids in close proximity!
  let cohesionRange = 100;
  let boidsInProximity = [];

  for(let i = 0; i < boidArr.length;  i++) {
    if(dist(_boid.x, _boid.y, boidArr[i].x, boidArr[i].y) < cohesionRange) {
      boidsInProximity.push(boidArr[i]);
    }
  }
}

function updateBoid(_boid) {
  _boid.x += _boid.dx;
  _boid.y += _boid.dy;
}

function boisBorder(_boid) {
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


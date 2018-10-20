let lightColor;
const r = 60;
const l = 1800;
const w = 1800;
const d = 1800;
let J = 1;
let pos;
let vel;
let acc;
let bounding_box;
let ball;
let zoom = (l + w) / 1.5;

function setup() {
  window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  bounding_box = new Box(l, w, d)
  pos = createVector(random(-l / 2, l / 2), random(-w / 2, w / 2), random(-d / 2, d / 2));
  vel = createVector(random(10), -random(10), random(10));
  acc = createVector(0, 1, 0);
  ball = new Ball(pos, vel, acc, r, J, bounding_box)
}

function draw() {
  background(102, 102, 102);

  translate(0, 0, -zoom);
  rotateX(map(mouseY, 0, height, -QUARTER_PI, QUARTER_PI));
  rotateY(map(mouseX, 0, width, -QUARTER_PI, QUARTER_PI));

  push();
  pointLight(250, 250, 250, 0, 0, w / 4);

  bounding_box.show();

  pop();

  ball.show();

  pop();

  ball.update();
}

function mouseWheel(event) {
  zoom -= event.delta;
}

function mousePressed() {
  if (mouseButton == LEFT) {
    ball.vel.y = abs(ball.vel.y) * 3 * ball.J / 2;
  }
  if (mouseButton == RIGHT) {
    ball.vel.mult(2 / (ball.J * 3));
  }
}

function keyTyped() {
  if (key == "l" || key == "L") {
    ball.lines = !ball.lines;
  }
  if (key == "k" || key == "K") {
    ball.shadow = !ball.shadow;
  }
  if (key == "b" || key == "B" || key == " ") {
    ball.vel.y -= ball.r / 6;
  }
  if (key == "w" || key == "W") {
    ball.vel.z -= ball.r / 6;
  }
  if (key == "s" || key == "S") {
    ball.vel.z += ball.r / 6;
  }
  if (key == "a" || key == "A") {
    ball.vel.x -= ball.r / 6;
  }
  if (key == "d" || key == "D") {
    ball.vel.x += ball.r / 6;
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    ball.J += 0.05;
    console.log(ball.J.toFixed(2));
  }
  if (keyCode == DOWN_ARROW) {
    ball.J -= 0.05;
    if (ball.J < 0) {
      ball.J = 0;
    }
    console.log(ball.J.toFixed(2));
  }
}

function sgn(n = 0) {
  if (n > 0) {
    return 1;
  }
  if (n < 0) {
    return -1;
  }
  return 0;
}

let lightColor;
const r = 60;
const l = 1800;
const w = 1800;
let J = 1;
let lines = false;
let pos;
let vel;
let acc;
let zoom = (l + w) / 1.5;

function setup() {
  window.addEventListener("contextmenu", function(e) {
    e.preventDefault();
  });
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  let d = (w + l) / 2;
  pos = createVector(random(-l / 2, l / 2), random(-w / 2, w / 2), random(-d / 2, d / 2));
  vel = createVector(random(10), -random(10), random(10));
  acc = createVector(0, 1, 0);
  lightColor = createVector(random(1000), random(1000), random(1000));
}

function draw() {
  background(noise(lightColor.x) * 255, noise(lightColor.y) * 255, noise(lightColor.z) * 255);

  translate(0, 0, -zoom);
  rotateX(map(mouseY, 0, height, -QUARTER_PI, QUARTER_PI));
  rotateY(map(mouseX, 0, width, -QUARTER_PI, QUARTER_PI));

  push();
  pointLight(250, 250, 250, 0, 0, w / 4);

  push();
  noFill();
  stroke(255);
  strokeWeight(5);
  box(1800);
  pop();

  pop();

  push();
  translate(pos.x, pos.y, pos.z);
  push();
  ambientMaterial(255);
  sphere(r);
  pop();
  if (lines) {
    push();
    rotateX(PI);
    translate(0, -floor(vel.y * r / 8 + sign(vel.y) * 2 * r), 0);
    specularMaterial(0, 255, 0);
    box(10, floor(abs(vel.y * r / 4)), 10);
    pop();

    push();
    rotateZ(HALF_PI)
    translate(0, -floor(vel.x * r / 8 + sign(vel.x) * 2 * r), 0);
    ambientMaterial(255, 0, 0);
    box(10, floor(abs(vel.x * r / 4)), 10);
    pop();

    push();
    rotateX(HALF_PI);
    translate(0, floor(vel.z * r / 8 + sign(vel.z) * 2 * r), 0);
    ambientMaterial(0, 0, 255);
    box(10, floor(abs(vel.z * r / 4)), 10);
    pop();
  }

  pop();

  vel.add(acc);
  pos.add(vel);

  if (pos.x + r >= l / 2) {
    vel.x *= -J;
    pos.x = l / 2 - r;
  }

  if (pos.x - r <= -l / 2) {
    vel.x *= -J;
    pos.x = -l / 2 + r;
  }

  if (pos.y + r >= w / 2) {
    vel.y *= -J;
    pos.y = w / 2 - r;
  }

  if (pos.y - r <= -w / 2) {
    vel.y *= -J;
    pos.y = -w / 2 + r;
  }

  if (pos.z + r >= w / 2) {
    vel.z *= -J;
    pos.z = w / 2 - r;
  }

  if (pos.z - r <= -w / 2) {
    vel.z *= -J;
    pos.z = -w / 2 + r;
  }

  lightColor.add(createVector(0.01, 0.01, 0.01));
}

function mouseWheel(event) {
  zoom -= event.delta;
}

function mousePressed() {
  if (mouseButton == LEFT) {
    vel.y = abs(vel.y) * 3 * J / 2;
  }
  if (mouseButton == RIGHT) {
    vel.mult(2 / (J * 3));
  }
}

function keyTyped() {
  if (key == "l" || key == "L") {
    lines = !lines;
  }
  if (key == "b" || key == "B" || key == " ") {
    vel.y -= r / 6;
  }
  if (key == "w" || key == "W") {
    vel.z -= r / 6;
  }
  if (key == "s" || key == "S") {
    vel.z += r / 6;
  }
  if (key == "a" || key == "A") {
    vel.x -= r / 6;
  }
  if (key == "d" || key == "D") {
    vel.x += r / 6;
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    J += 0.05;
    console.log(J.toFixed(2));
  }
  if (keyCode == DOWN_ARROW) {
    J -= 0.05;
    if (J < 0) {
      J = 0;
    }
    console.log(J.toFixed(2));
  }
}

function sign(n = 0) {
  if (n > 0) {
    return 1;
  }
  if (n < 0) {
    return -1;
  }
  return 0;
}
class Ball {
  constructor(position, velocity, acceleration, radius, impulse, bounds) {
    this.pos = position.copy();
    this.vel = velocity.copy();
    this.acc = acceleration.copy();
    this.r = radius;
    this.J = impulse;
    this.lines = false;
    this.shadow = true;
    this.bounds = bounds;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    if (this.pos.x + this.r >= this.bounds.l / 2) {
      this.vel.x *= -this.J;
      this.pos.x = this.bounds.l / 2 - this.r;
    }

    if (this.pos.x - this.r <= -this.bounds.l / 2) {
      this.vel.x *= -this.J;
      this.pos.x = -this.bounds.l / 2 + this.r;
    }

    if (this.pos.y + this.r >= this.bounds.w / 2) {
      this.vel.y *= -this.J;
      this.pos.y = this.bounds.w / 2 - this.r;
    }

    if (this.pos.y - this.r <= -this.bounds.w / 2) {
      this.vel.y *= -this.J;
      this.pos.y = -this.bounds.w / 2 + this.r;
    }

    if (this.pos.z + this.r >= this.bounds.h / 2) {
      this.vel.z *= -this.J;
      this.pos.z = this.bounds.h / 2 - this.r;
    }

    if (this.pos.z - this.r <= -this.bounds.h / 2) {
      this.vel.z *= -this.J;
      this.pos.z = -this.bounds.h / 2 + this.r;
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    push();
    ambientMaterial(255);
    sphere(this.r);
    pop();
    this.show_lines(this.lines);
    this.show_shadow(this.shadow);
  }

  show_shadow(to_be_shown) {
    if (to_be_shown) {
      push();
      translate(0, this.bounds.h / 2 - this.pos.y, 0);
      rotateX(HALF_PI);
      fill(0, 0, 0, 204);
      noStroke();
      ellipse(0, 0, map(this.pos.y, -this.bounds.h, this.bounds.h, 3 * this.r, 0.75 * this.r));
      pop();
    }
  }

  show_lines(to_be_shown) {
    if (to_be_shown) {
      push();
      rotateX(PI);
      translate(0, -floor(this.vel.y * this.r / 8 + sgn(this.vel.y) * 2 * this.r), 0);
      specularMaterial(0, 255, 0);
      box(10, floor(abs(this.vel.y * this.r / 4)), 10);
      pop();

      push();
      rotateZ(HALF_PI)
      translate(0, -floor(this.vel.x * this.r / 8 + sgn(this.vel.x) * 2 * this.r), 0);
      ambientMaterial(255, 0, 0);
      box(10, floor(abs(this.vel.x * this.r / 4)), 10);
      pop();

      push();
      rotateX(HALF_PI);
      translate(0, floor(this.vel.z * this.r / 8 + sgn(this.vel.z) * 2 * this.r), 0);
      ambientMaterial(0, 0, 255);
      box(10, floor(abs(this.vel.z * this.r / 4)), 10);
      pop();
    }
  }

}

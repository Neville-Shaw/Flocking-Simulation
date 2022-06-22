class Boid {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector();

    // limits the birds speed directly
    this.maxSpeed = 2;
    // directly limits steering
    this.maxForce = 0.1;

    // Random2D generates a random direction but with a total mag of 1
    // This is what randomizes their speeds
    this.vel.setMag(random(1, 2));

    // Size of the boids
    this.r = 2;

    this.perceptionRadius = perception;

    // Just rainbow stuff
    this.rc = random(255);
    this.gc = random(255);
    this.bc = random(255);
  }

  edges() {
    // Check X
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }

    // Check Y
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);

    this.vel.limit(this.maxSpeed);

    this.acc.set(0, 0);
  }

  flee(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();

    let distance;
    if (arriveAtMouse) {
      // 200
      distance = mousePowerSlider.value();
    } else {
      distance = mousePowerSlider.value()/2;
    }

    if (d < distance) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      let steering = p5.Vector.sub(desired, this.vel);
      steering.limit(this.maxForce);
      return steering;
    } else {
      return createVector(0, 0);
    }
  }

  flock(boids) {
    let perceptionRadius;
    if (sepBoost) {
      this.perceptionRadius = 500;
    } else {
      perceptionRadius = this.perceptionRadius;
    }
    let separation = createVector();
    let cohesion = createVector();
    let alignment = createVector();
    let total = 0;

    for (let other of boids) {
      let d = p5.Vector.dist(this.pos, other.pos);
      if (other != this && d < perceptionRadius) {
        // Separation
        if (d < (this.perceptionRadius / 3) * separationSlider.value()) {
          let diff = p5.Vector.sub(this.pos, other.pos);
          diff.div(d);
          separation.add(diff);
        }

        // Cohesion
        cohesion.add(other.pos);
        // Alignment
        alignment.add(other.vel);

        total++;
      }
      count++;
    }
    if (total > 0) {
      // separation
      separation.div(total);
      separation.setMag(this.maxSpeed);
      separation.sub(this.vel);
      separation.limit(this.maxForce);
      // Cohesion
      cohesion.div(total);
      cohesion.sub(this.pos);
      cohesion.setMag(this.maxSpeed);
      cohesion.sub(this.vel);
      cohesion.limit(this.maxForce);
      // Alignment
      alignment.div(total);
      alignment.setMag(this.maxSpeed);
      alignment.sub(this.vel);
      alignment.limit(this.maxForce);
    } else {
      alignment.mult(0);
    }

    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);

    // Somewhat arbitrary weights
    // Cohesion is what makes the boids jittery at higher amounts
    separation.mult(1.1);
    cohesion.mult(cohesionSlider.value());
    alignment.mult(alignmentSlider.value());
    flee.mult(6);

    // Add all of the steering forces
    this.acc.add(separation);
    this.acc.add(alignment);
    this.acc.add(cohesion);
    if (mouseIsPressed) {
      if (arriveAtMouse) {
        this.acc.sub(flee);
      } else {
        this.acc.add(flee);
      }
    }


    this.pos.add(this.vel);
    this.vel.add(this.acc);

    this.vel.limit(this.maxSpeed);

    this.acc.set(0, 0);
  }

  show(showPerception) {
    if (rainbow) {
      fill(this.rc, this.gc, this.bc);
      stroke(this.rc + 30, this.gc + 30, this.bc + 30);
    } else {
      fill(110);
      stroke(190);
    }

    // Get the direction of the boids heading
    let theta = this.vel.heading() + radians(90);
    this.r = 2;
    strokeWeight(0.1);
    //noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    imageMode(CENTER);
    if (enableImages) {
      // Sailboat
      if (spritesNum == 1) {
        this.r = 18;
        image(sprites[spritesNum], 0, 0, this.r, this.r);
      }
      // Ant
      else if (spritesNum == 2) {
        this.r = 30;
        image(sprites[spritesNum], 0, 0, this.r, this.r);
      } else {
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
      }
    } else {
      beginShape();
      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);
      endShape(CLOSE);
    }
    pop();
    this.perceptionRadius = perception;
    if (showPerception) {
      noFill();
      stroke(255);
      ellipse(
        this.pos.x,
        this.pos.y,
        this.perceptionRadius,
        this.perceptionRadius
      );
    }
  }
}

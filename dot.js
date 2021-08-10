class Dot {
    constructor(){
        this.pos = createVector(width/2, height-10);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.brain = new Brain(400);

        this.dead = false;
        this.reachGoal = false;

        this.fitness = 0;

        this.isBest = false;
    }

    update(){
        if (!this.dead && !this.reachGoal) {
            this.move();
            if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
                this.dead = true;
            } else if (dist(this.pos.x, this.pos.y, goal.x, goal.y) <= 5) {
                this.reachGoal = true;
            }
        }
    }

    move(){
        if (this.brain.step < this.brain.directions.length) {
            this.acc = this.brain.directions[this.brain.step];
            this.brain.step++;
        } else {
            this.dead = true;
        }

        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
    }

    show(){
        noStroke();
        if (this.isBest) {
            fill(0, 255, 0);
        } else {
            fill(255);
        }
        ellipse(this.pos.x, this.pos.y, 4);
    }

    calculateFitness(){
        if (this.reachGoal) {
            this.fitness = 1.0/16.0 + 10000.0/float(sq(this.brain.step));
        } else {
            let distToGoal = dist(this.pos.x, this.pos.y, goal.x, goal.y);
            this.fitness = 1.0/sq(distToGoal);
        }
    }

    getBaby(){
        let baby = new Dot();
        baby.brain = this.brain.clone();
        return baby;
    }
}
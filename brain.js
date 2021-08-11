class Brain {
    constructor(size){
        this.directions = [];
        this.step = 0;
        this.size = size;
        this.randomize();
    }

    randomize(){
        for (let i = 0; i < this.size; i++) {
            this.directions.push(p5.Vector.fromAngle(random(2*PI)));
        }
    }

    clone() {
        let clone = new Brain(this.directions.length);
        for (const i in this.directions) {
            clone.directions[i] = this.directions[i].copy();
        }
        return clone;
    }

    mutate(){
        let mutationRate = 0.01;
        for (const i in this.directions) {
            let rand = random(1);
            if (rand < mutationRate) {
                this.directions[i] = p5.Vector.fromAngle(random(2*PI));
            }
        }
    }
}
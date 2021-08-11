class Population {
    constructor(size){
        this.size = size;
        this.dots = [];
        this.bestDot = 0;
        this.fitnessSum = 0;
        this.generation = 1;
        this.minStep = Infinity;
        for (let i = 0; i < size; i++) {
            this.dots.push(new Dot())
        }
    }

    update(){
        for (const dot of this.dots) {
            if (dot.brain.step > this.minStep) {
                dot.dead = true;
            }
            dot.update();
        }
    }

    show(){
        for (const dot of this.dots) {
            dot.show();
        }
    }

    calculateFitness(){
        for (const dot of this.dots) {
            dot.calculateFitness();
        }
    }

    allAreDead(){
        for (const dot of this.dots) {
            if (!dot.dead && !dot.reachGoal) {
                return false;
            }
        }
        return true;
    }

    naturalSelection(){
        let newDots = [];
        this.setBestDot();
        this.calculateFitnessSum();

        newDots.push(this.dots[this.bestDot].getBaby());
        newDots[0].isBest = true;
        for (let i = 1; i < this.size; i++) {
            let parent = this.selectParent();
            newDots.push(parent.getBaby());
        }
        this.dots = newDots;
        this.generation++;
    }

    calculateFitnessSum(){
        this.fitnessSum = 0;
        for (const dot of this.dots) {
            this.fitnessSum += dot.fitness;
        }
    }

    selectParent(){
        let rand = random(this.fitnessSum);
        let runningSum = 0;
        for (const dot of this.dots) {
            runningSum += dot.fitness;
            if (runningSum > rand) {
                return dot;
            }
        }
    }

    mutate(){
        for (let i = 1; i < this.dots.length; i++) {
            this.dots[i].brain.mutate();
        }
    }

    setBestDot(){
        let max = 0;
        let maxIndex = 0;
        for (const i in this.dots) {
            if (this.dots[i].fitness > max) {
                max = this.dots[i].fitness;
                maxIndex = i;
            }
        }

        this.bestDot = maxIndex;

        if (this.dots[this.bestDot].reachGoal) {
            this.minStep = this.dots[this.bestDot].brain.step;
            console.log(this.minStep);
        }
    }
}
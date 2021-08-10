let goal;
let pop;

function setup() {
    createCanvas(500, 800);

    goal = createVector(width/2, 40);
    pop = new Population(1000);
}

function draw() {
    background(0);

    noStroke();
    fill(255, 0, 0);
    ellipse(goal.x, goal.y, 10)

    if (pop.allAreDead()) {
        pop.calculateFitness();
        pop.naturalSelection();
        pop.mutate();
    } else {
        pop.update();
        pop.show();
    }
}
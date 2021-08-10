let goal;
let testDot;

function setup() {
    createCanvas(500, 800);

    goal = createVector(width/2, 80);
    testDot = new Dot();
}

function draw() {
    background(0);

    noStroke();
    fill(255);
    ellipse(goal.x, goal.y, 100)

    testDot.update();
    testDot.show();
}
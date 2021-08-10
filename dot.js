class Dot {
    constructor(){
        this.x = width/2;
        this.y = height-20;
        this.w = 8;
    }

    update(){
        this.x += random(-1, 1);
        this.y += random(-1, 1);
    }

    show(){
        fill(255);
        stroke(255,0,0);
        strokeWeight(3)
        ellipse(this.x, this.y, this.w);
    }
}
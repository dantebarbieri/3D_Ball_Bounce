class Box{
  constructor(length, width, height){
    this.l = length;
    this.w = width;
    this.h = height;
  }

  show(){
    push();
    noFill();
    stroke(255);
    strokeWeight(5);
    box(this.l, this.w, this.h);
    pop();
  }
}

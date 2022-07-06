class Rectangle {
  constructor({ x, y, w, h, isStatic = false, options = {} }) {
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    Matter.World.add(world, this.body);
    this.w = w;
    this.h = h;
    if (isStatic) {
      Matter.Body.setStatic(this.body, true);
    }
  }
  draw() {}
}

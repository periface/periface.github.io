class Circle {
  constructor({ x, y, r, isStatic = false, options = {} }) {
    this.body = Matter.Bodies.circle(x, y, r, options);
    this.body.restitution = 1;
    Matter.World.add(world, this.body);
    this.r = r;
    this.body.isStatic = isStatic;
  }
}

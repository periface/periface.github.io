class Rectangle {
  constructor({
    x,
    y,
    w,
    h,
    isStatic = false,
    disablePhysics = false,
    options = {},
  }) {
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    Matter.World.add(world, this.body);
    this.body.restitution = 0.5;
    this.w = w;
    this.h = h;
    if (isStatic) {
      Matter.Body.setStatic(this.body, true);
    }
    if (disablePhysics) {
      this.body.collisionFilter = {
        group: -1,
        category: 2,
        mask: 0,
      };
    }
  }
}

class Rectangle {
  constructor({
    x,
    y,
    w,
    h,
    isStatic = false,
    disablePhysics = false,
    bodyRestitution = 0.5,
    options = {},
  }) {
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    Matter.World.add(world, this.body);
    this.body.restitution = bodyRestitution;
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
  destroy() {
    Matter.World.remove(world, this);
  }
  isOffScreen() {
    let position = this.body.position;
    if (position.y > canvas.height + 100) {
      return true;
    } else {
      return false;
    }
  }
}

class Cannon {
  constructor({ x, y, body }) {
    let options = {
      bodyB: body,
      pointA: {
        x: x,
        y: y,
      },
      stiffness: 0.5,
      length: 20,
    };
    this.sling = Constraint.create(options);
    World.add(world, this.sling);
  }
  draw() {
    ctx.stroke(255);
    const posA = this.sling.pointA;
    const posB = this.sling.body.position;
    ctx.line(posA.x, posA.y, posB.x, posB.y);
  }
}

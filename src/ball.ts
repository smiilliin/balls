import * as PIXI from "pixi.js";
import { randomRange } from "./main";

type App = PIXI.Application<PIXI.ICanvas>;

const toRadian = (x: number) => {
  return x * (Math.PI / 180);
};
const distance2 = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
};

class Ball {
  x: number;
  y: number;
  angle: number;
  power: number = 2;
  radius: number;
  circle: PIXI.Graphics;

  draw() {}

  constructor(
    app: App,
    radius: number = 10,
    color: PIXI.ColorSource | undefined = undefined
  ) {
    this.radius = radius;
    this.x = randomRange(this.radius, app.renderer.width - this.radius);
    this.y = randomRange(this.radius, app.renderer.height - this.radius);
    this.angle = randomRange(0, toRadian(360));
    this.circle = new PIXI.Graphics();

    if (!color) {
      const colors = [
        0xdee6c3, 0xf7e3de, 0xe8e5da, 0xf4d9df, 0xadd1c3, 0xd1eff0, 0xdaeefa,
        0xd4d4e4, 0xd0d2d9,
      ];
      this.circle.beginFill(colors[Math.floor(randomRange(0, colors.length))]);
    } else {
      this.circle.beginFill(color);
    }
    this.circle.drawCircle(0, 0, this.radius);
    this.circle.endFill();

    app.stage.addChild(this.circle);
  }
  private checkBalls(balls: Ball[], index: number): boolean {
    return (
      balls.find(
        (ball, ballIndex) =>
          ballIndex != index &&
          distance2(this.x, this.y, ball.x, ball.y) <=
            Math.pow(this.radius + ball.radius, 2)
      ) != undefined
    );
  }
  private checkLeft(balls: Ball[], index: number): boolean {
    return this.x - this.radius <= 0 || this.checkBalls(balls, index);
  }
  private checkRight(app: App, balls: Ball[], index: number): boolean {
    return (
      this.x + this.radius >= app.renderer.width ||
      this.checkBalls(balls, index)
    );
  }
  private checkTop(balls: Ball[], index: number): boolean {
    return this.y - this.radius <= 0 || this.checkBalls(balls, index);
  }
  private checkBottom(app: App, balls: Ball[], index: number): boolean {
    return (
      this.y + this.radius >= app.renderer.height ||
      this.checkBalls(balls, index)
    );
  }
  tick(app: App, balls: Ball[], index: number) {
    const limit = 20;
    let checkCounter = 0;

    this.x += Math.cos(this.angle) * this.power;
    if (this.checkLeft(balls, index)) {
      this.angle = toRadian(180) - this.angle;

      while (this.checkLeft(balls, index) && checkCounter++ <= limit) {
        this.x += Math.cos(this.angle) * this.power;
      }
    }

    checkCounter = 0;
    if (this.checkRight(app, balls, index)) {
      this.angle = toRadian(180) - this.angle;

      while (this.checkRight(app, balls, index) && checkCounter++ <= limit) {
        this.x += Math.cos(this.angle) * this.power;
      }
    }

    this.y += Math.sin(this.angle) * this.power;
    checkCounter = 0;
    if (this.checkTop(balls, index)) {
      this.angle = -this.angle;

      while (this.checkTop(balls, index) && checkCounter++ <= limit) {
        this.y += Math.sin(this.angle) * this.power;
      }
    }

    checkCounter = 0;
    if (this.checkBottom(app, balls, index)) {
      this.angle = -this.angle;

      while (this.checkBottom(app, balls, index) && checkCounter++ <= limit) {
        this.y += Math.sin(this.angle) * this.power;
      }
    }

    this.circle.x = this.x;
    this.circle.y = this.y;
  }
}
class MousePointer extends Ball {
  constructor(app: App) {
    super(app, 30, 0xffffff);
  }
  move(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.circle.x = x;
    this.circle.y = y;
  }
}
export { Ball, MousePointer };

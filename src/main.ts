const randomRange = (x: number, y: number) => {
  return Math.random() * (y - x) + x;
};
export { randomRange };

import * as PIXI from "pixi.js";
import { Ball, MousePointer } from "./ball";

const app = new PIXI.Application({
  background: "#000000",
  resizeTo: window,
});

document.body.appendChild(app.view as HTMLCanvasElement);

const mousePointer = new MousePointer(app);

mousePointer.move(-100, -100);

const balls: Ball[] = [];
for (let i = 0; i < 100; i++) {
  balls.push(new Ball(app));
}
balls.push(mousePointer);

app.stage.eventMode = "static";
app.stage.hitArea = app.screen;
app.stage.on("pointermove", (event) => {
  mousePointer.move(event.x, event.y);
});
window.onresize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  balls.map((ball, index) => {
    if (balls.length - 1 == index) return ball;
    if (ball.x > width - ball.radius) {
      ball.x = width - ball.radius;
    }
    if (ball.y > height - ball.radius) {
      ball.y = height - ball.radius;
    }
    return ball;
  });
};

app.ticker.add(() => {
  balls.forEach((ball, index) => {
    if (index == balls.length - 1) return;
    ball.tick(app, balls, index);
  });
});

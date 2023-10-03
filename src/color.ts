import { randomRange } from "./main";

class Color {
  counter: number = 0;
  toR: number = 1;
  toG: number = 1;
  toB: number = 1;
  currentR: number = 1;
  currentG: number = 1;
  currentB: number = 1;

  static delay = 60 * 3;

  tick() {
    this.counter++;

    if (this.counter % Color.delay == 0) {
      this.toR = randomRange(0.3, 1);
      this.toG = randomRange(0.3, 1);
      this.toB = randomRange(0.3, 1);
    }
    this.currentR =
      this.currentR + ((this.toR - this.currentR) / Color.delay) * this.counter;
    this.currentG =
      this.currentR + ((this.toR - this.currentR) / Color.delay) * this.counter;
    this.currentB =
      this.currentR + ((this.toR - this.currentR) / Color.delay) * this.counter;
  }
  getRGB() {
    return [this.currentR, this.currentB, this.currentB];
  }
}

export { Color };

class Grafics1d {
  constructor() {
    this.xmin = -10.0;
    this.xmax = 10.0;
    this.ymin = -10.0;
    this.ymax = 10.0;
    this.W = 800;
    this.H = 600;
    this.f = function (x) {
      return x * x - 9;
    }
    this.Float64Array = new Float64Array(this.W);
  }
  evaluate() {
    let j = 0;
    let dx = (this.xmax - this.xmin) / this.W;
    for(let i = this.xmin; i <= this.xmax; i += dx) {
      this.Float64Array[j] = this.f(i);
      j++;
    }
  }
  autodraw() {
    let fmax = this.Float64Array[0];
    let fmin = this.Float64Array[0];
    for(let i = 1; i < this.Float64Array.length; i++) {
      fmax = Math.max(fmax, this.Float64Array[i]);
      fmin = Math.min(fmin, this.Float64Array[i]);
    }
    this.ymax = fmax;
    this.ymin = fmin;
  }
  draw() {
    let dx = (this.xmax - this.xmin) / this.W;
    let dy = (this.ymax - this.ymin) / this.H;
    let S1 = this.W / (this.xmax - this.xmin);
    let S2 = this.H / (this.ymin - this.ymax);

    const canvas = document.getElementById('canvas');
    canvas.height = this.H;
    canvas.width = this.W;
    const ctx = canvas.getContext('2d');
    ctx.strokeRect(0, 0, this.W, this.H);

    ctx.beginPath();
    let Y = (this.ymax - this.ymin)*S2+this.H;
    for(let x = 0; x <= this.W; x += S1) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, Y+this.H);
    }
    ctx.strokeStyle = '#b6b6b6';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    let X = (this.xmax - this.xmin)*S1;
    for(let y = 0; y <= this.H; y -= S2) {
      ctx.moveTo(0, y);
      ctx.lineTo(X, y);
    }
    ctx.strokeStyle = '#b6b6b6';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    X = (0 - this.xmin)*S1;
    Y = this.H;
    ctx.moveTo(X, Y);
    for(let y = this.ymin; y <= this.ymax; y += dy) {
      Y = (y-this.ymin)*S2+this.H;
      ctx.lineTo(X, Y);
    }
    ctx.strokeStyle = '#1a6619';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    X = 0;
    Y = (0-this.ymin)*S2+this.H;
    ctx.moveTo(X, Y);
    for(let x = this.xmin; x <= this.xmax; x += dx) {
      X = (x-this.xmin)*S1;
      ctx.lineTo(X, Y);
    }
    ctx.strokeStyle = '#1a6619';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(0, (this.Float64Array[0]-this.ymin) * S2 + this.H);
    let i = 1;
    for(let x = this.xmin + dx; x <= this.xmax; x += dx) {
      ctx.lineTo((x-this.xmin)*S1, (this.Float64Array[i]-this.ymin)*S2+this.H);
      i++;
    }
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();

    i = 0;
    for(let x = this.xmin; x < this.xmax; x += dx) {
      X = (x-this.xmin)*S1;
      Y = (this.Float64Array[i]-this.ymin)*S2+this.H;
      if(this.Float64Array[i] * this.Float64Array[i+1] < 0 && Math.abs(this.Float64Array[i] * this.Float64Array[i+1]) < Math.abs(this.ymax / 8)) {
        ctx.beginPath();
        let Y2 = (this.Float64Array[i+1]-this.ymin)*S2+this.H;
        ctx.arc(X, Y, 2, 0, 2 * Math.PI);
        ctx.arc(X, Y2, 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'indigo';
        ctx.fill();
        ctx.closePath();
      }
      i++;
    }

    i = 0;
    for(let x = this.xmin; x < this.xmax; x += dx) {
      X = (x-this.xmin)*S1;
      if((this.Float64Array[i] > this.ymax / 16 && this.Float64Array[i + 1] < this.ymin / 16) ||
        (this.Float64Array[i] < this.ymin / 16 && this.Float64Array[i + 1] > this.ymax / 16)) {
        ctx.beginPath();
        X = (x-this.xmin)*S1;
        Y = (0-this.ymin)*S2+this.H;
        ctx.arc(X, Y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'magenta';
        ctx.fill();
        ctx.closePath();
      }
      i++;
    }
  }
}
let grafic = new Grafics1d();
grafic.evaluate();
grafic.autodraw();
grafic.draw();


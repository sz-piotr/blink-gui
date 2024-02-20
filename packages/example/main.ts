import { BlinkGui } from "blink-gui";
import Stats from "stats.js";

const stats = new Stats();
stats.showPanel(1);
stats.dom.style.removeProperty("left");
stats.dom.style.right = "0";
document.body.appendChild(stats.dom);

const canvas = document.createElement("canvas");
canvas.width = 300 * window.devicePixelRatio;
canvas.height = 200 * window.devicePixelRatio;
canvas.style.position = "absolute";
canvas.style.width = "300px";
canvas.style.height = "200px";
canvas.style.left = "260px";
canvas.style.top = "30px";
canvas.style.border = "1px solid black";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d")!;

const game = {
  scale: 100 * window.devicePixelRatio,
  gravity: 10,
  ball: {
    size: 0.1,
    position: { x: 1, y: 1.5 },
    velocity: { x: 0, y: 0 },
  },
};

function updateGame(timeDelta: number) {
  game.ball.velocity.y -= game.gravity * timeDelta;
  game.ball.position.x += game.ball.velocity.x * timeDelta;
  game.ball.position.y += game.ball.velocity.y * timeDelta;

  if (game.ball.position.y < game.ball.size) {
    game.ball.position.y = game.ball.size;
    game.ball.velocity.y *= -0.9;
  }
}

function renderGame() {
  ctx.save();

  ctx.translate(0, canvas.height);
  ctx.scale(game.scale, -game.scale);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";

  ctx.beginPath();
  ctx.arc(
    game.ball.position.x,
    game.ball.position.y,
    game.ball.size,
    0,
    Math.PI * 2,
  );
  ctx.fill();

  ctx.restore();
}

const ui = new BlinkGui();

let count = 0;
const config = {
  first: 1,
  second: 2,
  magicNumber: 3,
  doublePower: false,
  isCrazy: true,
  label: "Hello, world!",
  rocky: "Balboa",
};

function renderUi() {
  ui.text(`Click count: ${count}`);
  ui.text(
    "This is an example of how longer text actually looks like. As you can see the words neatly wrap into multiple lines.",
  );

  ui.controlSet(config);

  ui.vectorControl(game.ball, "position", ["x", "y"]);
  ui.vectorControl(game.ball, "velocity", ["x", "y"]);

  if (ui.button("Increment")) {
    count += config.doublePower ? 2 : 1;
  }

  ui.button("Button", { label: "Labelled" });

  ui.text(`Character count: ${config.label.length}`);

  ui.end();
}

let lastTime = 0;
requestAnimationFrame(loop);
function loop() {
  const now = performance.now();
  const timeDelta = (now - lastTime) / 1000;
  lastTime = now;

  updateGame(timeDelta);

  stats.begin();
  renderUi();
  stats.end();

  renderGame();

  requestAnimationFrame(loop);
}

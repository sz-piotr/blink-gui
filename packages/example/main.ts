import { BlinkGui } from "blink-gui";

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
    "This is an example of how longer text actually looks like. As you can see the words neatly wrap into multiple lines."
  );

  ui.controlSet(config);

  if (ui.button("Increment")) {
    count += config.doublePower ? 2 : 1;
  }

  ui.text(`Character count: ${config.label.length}`);

  ui.end();
}

requestAnimationFrame(loop);
function loop() {
  renderUi();
  requestAnimationFrame(loop);
}

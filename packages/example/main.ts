import { BlinkGui } from "blink-gui";

const ui = new BlinkGui();

let count = 0;
const config = {
  doublePower: false,
  label: "Hello, world!",
};

function renderUi() {
  ui.text(`Click count: ${count}`);

  ui.control(config, "doublePower");
  ui.control(config, "label");

  ui.textbox("Main text");
  ui.textbox("NPC 2 Name");

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

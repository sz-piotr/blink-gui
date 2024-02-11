import { Immui } from "immui";

const ui = new Immui();

let count = 0;
const config = {
  doublePower: false,
};

function renderUi() {
  ui.label(`Click count: ${count}`);
  ui.control(config, "doublePower");

  if (ui.button("Increment")) {
    count += config.doublePower ? 2 : 1;
  }

  ui.end();
}

requestAnimationFrame(loop);
function loop() {
  renderUi();
  requestAnimationFrame(loop);
}

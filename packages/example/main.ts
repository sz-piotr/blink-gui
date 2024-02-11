import { Immui } from "immui";

const ui = new Immui();

let visible = false;

function renderUi() {
  if (ui.button(!visible ? "Show" : "Hide")) {
    visible = !visible;
  }
  if (visible) {
    ui.container((ui) => {
      ui.label("Hello, world!");
    });
  }

  ui.end();
}

requestAnimationFrame(loop);
function loop() {
  renderUi();
  requestAnimationFrame(loop);
}

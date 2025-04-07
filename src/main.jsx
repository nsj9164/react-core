import App from "./App.jsx";
import { render } from "./libs/render.js";

const root = document.getElementById("root");

function rerender() {
  root.innerHTML = "";
  const appElement = App();
  render(appElement, root);
}

rerender();

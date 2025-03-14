import App from "./App.jsx";
import { render } from "./libs/render.js";

const appElement = App();
console.log(JSON.stringify(appElement, null, 2));

const root = document.getElementById("root");
render(appElement, root);

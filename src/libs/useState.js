import App from "../App";
import { render } from "./render";

let stateStore = [];
let stateIndex = 0;

export function useState(initialValue) {
  const currentIndex = stateIndex;

  if (stateStore[currentIndex] === undefined) {
    stateStore[currentIndex] = initialValue;
  }

  const setState = (newValue) => {
    if (typeof newValue === "function") {
      newValue = newValue(stateStore[currentIndex]);
    }

    if (stateStore[currentIndex] !== newValue) {
      stateStore[currentIndex] = newValue;

      triggerRender();
    }
  };

  stateIndex++;

  return [stateStore[currentIndex], setState];
}

// 컴포넌트 리렌더링
function triggerRender() {
  stateIndex = 0;
  const root = document.getElementById("root");

  root.innerHTML = "";
  const virtualDOM = App();
  render(virtualDOM, root);
}

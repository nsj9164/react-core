import App from "../App";
import { render } from "./render";

let stateStore = [];
let stateIndex = 0;

export function useState(initialState) {
  const currentIndex = stateIndex;

  if (stateStore[currentIndex] === undefined) {
    stateStore[currentIndex] = initialState;
  }

  const setState = (newState) => {
    if (typeof newState === "function") {
      newState = newState(stateStore[currentIndex]);
    }

    if (stateStore[currentIndex] !== newState) {
      stateStore[currentIndex] = newState;

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

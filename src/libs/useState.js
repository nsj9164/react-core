import { render } from "./render";

let rootComponent = null;
let lastContainer = null;
let stateStore = [];
let stateIndex = 0;

export function useState(initialState) {
  const currentIndex = stateIndex;

  if (stateStore[currentIndex] === undefined) {
    stateStore[currentIndex] = initialState;
  }

  function setState(newState) {
    if (typeof newState === "function") {
      stateStore[currentIndex] = newState(stateStore[currentIndex]);
    } else {
      stateStore[currentIndex] = newState;
    }
    if (rootComponent && lastContainer) {
      render(rootComponent(), lastContainer);
    }
  }

  stateIndex++;

  return [stateStore[currentIndex], setState];
}

import App from "../App.jsx";
import { diff } from "./diff.js";
import { initEventDelegation } from "./events.js";
import { resetHookIndex, runEffects } from "./useEffect.js";
import { injectRerender, resetStateIndex } from "./useState.js";

let oldVNode = null;
let rootContainer = null;

export function render(vdom, container) {
  rootContainer = container;

  resetStateIndex();

  if (!oldVNode) {
    container.innerHTML = "";
    mount(vdom, container);
  } else {
    diff(oldVNode, vdom, container);
  }

  oldVNode = vdom;

  resetHookIndex();
  runEffects();
}

// setState될 때 실행할 리렌더 함수
injectRerender(() => {
  if (!rootContainer) return;

  const newVdom = App();
  render(newVdom, rootContainer);
});

initEventDelegation();

// Virtual DOM을 실제 DOM에 mount
function mount(vdom, container) {
  const dom = createDom(vdom);
  container.appendChild(dom);
}

// Virtual DOM을 실제 DOM으로 변환하는 함수
function createDom(vdom) {
  if (typeof vdom === "string" || typeof vdom === "number") {
    return document.createTextNode(vdom);
  }

  const dom = document.createElement(vdom.type);
  dom.vdom = vdom;
  vdom.events = {};

  if (vdom.props) {
    Object.keys(vdom.props)
      .filter((key) => key !== "children")
      .forEach((key) => {
        if (key.startsWith("on") && typeof vdom.props[key] === "function") {
          let eventType = key.toLowerCase().substring(2);

          if (eventType === "change" && vdom.type === "input") {
            eventType = "input";
          }

          vdom.events[eventType] = vdom.props[key];
        } else {
          dom[key] = vdom.props[key];
        }
      });
  } else {
    vdom.events = {};
  }

  const children = vdom.props?.children || [];
  (Array.isArray(children) ? children : [children]).forEach((child) =>
    mount(child, dom)
  );

  return dom;
}

export { mount, createDom };

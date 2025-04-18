import App from "../App.jsx";
import { applyProps, diff } from "./diff.js";
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
  if (vdom === false || vdom === null || vdom === undefined) {
    return document.createTextNode(""); // React처럼 무시
  }

  if (typeof vdom === "string" || typeof vdom === "number") {
    return document.createTextNode(vdom);
  }

  const dom = document.createElement(vdom.type);
  dom.vdom = vdom;
  vdom.events = {};

  if (vdom.props) {
    applyProps(dom, {}, vdom.props, vdom);
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

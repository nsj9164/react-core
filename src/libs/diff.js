import { createDom, mount } from "./render.js";

export function diff(oldVNode, newVNode, parent) {
  // 처음 렌더링일 경우
  if (!oldVNode) {
    mount(newVNode, parent);
    return;
  }

  // 제거된 경우
  if (!newVNode) {
    parent.innerHTML = "";
    return;
  }

  // type이 다르거나 tagName이 다른 경우
  if (typeof oldVNode !== typeof newVNode || oldVNode.type !== newVNode.type) {
    // input change는 value만 업데이트
    if (oldVNode.type === "input" && newVNode.type === "input") {
      updateProps(parent.firstChild, oldVNode.props, newVNode.props);
      return;
    }
    parent.replaceChild(createDom(newVNode), parent.firstChild);
    return;
  }

  const parentRoot = parent.firstChild;
  if (!parentRoot) return;

  updateProps(parent.firstChild, oldVNode.props, newVNode.props);

  const oldChildren = Array.isArray(oldVNode.props?.children)
    ? oldVNode.props.children
    : [oldVNode.props?.children].filter(Boolean);

  const newChildren = Array.isArray(newVNode.props?.children)
    ? newVNode.props.children
    : [newVNode.props?.children].filter(Boolean);

  oldChildren.forEach((oldChild, i) => {
    const newChild = newChildren[i];
    const childDom = parent.firstChild.childNodes[i];

    if (!newChild) {
      parent.firstChild.removeChild(childDom);
    } else {
      if (childDom) {
        updateProps(childDom, oldChild.props, newChild.props);
        diff(oldChild, newChild, childDom);
      }
    }
  });

  newChildren.forEach((child, i) => {
    if (!oldChildren[i]) {
      parent.firstChild.appendChild(createDom(child));
    } else {
      diff(oldChildren[i], newChildren[i], parent.firstChild);
    }
  });
}

// 기존 DOM의 속성을 새로운 Virtual DOM의 속성과 비교하여 변경 부분 적용
function updateProps(dom, oldProps = {}, newProps = {}) {
  if (!dom) return;
  Object.keys(newProps).forEach((key) => {
    if (key === "children") return;

    if (oldProps[key] !== newProps[key]) {
      if (key === "value" && dom.tagName === "INPUT") {
        if (dom.value !== newProps[key]) {
          dom.value = newProps[key];
        }
      } else if (key.startsWith("on") && typeof newProps[key] === "function") {
        let eventType = key.toLowerCase().substring(2);
        if (eventType === "change" && dom.tagName === "INPUT") {
          eventType = "input";
        }
        if (dom.vdom && dom.vdom.events) {
          dom.vdom.events[eventType] = newProps[key];
        }
        // dom.addEventListener(eventType, newProps[key]);
      } else {
        dom.setAttribute(key, newProps[key]);
      }
    }
  });

  Object.keys(oldProps).forEach((key) => {
    if (!(key in newProps)) {
      dom.removeAttribute(key);
    }
  });
}

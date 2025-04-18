import { createDom, mount } from "./render.js";

// dom node update
export function diff(oldVNode, newVNode, parent) {
  // console.log(parent);
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

  updateProps(parentRoot, oldVNode.props, newVNode.props);

  const oldChildren = normalizeChildren(oldVNode);
  const newChildren = normalizeChildren(newVNode);

  // key 기반 비교
  const oldKeyed = {};
  const newKeyed = {};

  oldChildren.forEach((child, i) => {
    const key = child?.props?.key;
    if (key != null) oldKeyed[key] = { child, index: i };
  });

  newChildren.forEach((child, i) => {
    const key = child?.props?.key;
    if (key != null) newKeyed[key] = { child, index: i };
  });

  // REMOVE
  Object.keys(oldKeyed).forEach((key) => {
    if (!(key in newKeyed)) {
      const { index } = oldKeyed[key];
      const dom = parentRoot.childNodes[index];
      if (dom) parentRoot.removeChild(dom);
    }
  });

  // UPDATE
  Object.keys(newKeyed).forEach((key) => {
    if (key in oldKeyed) {
      const oldChild = oldKeyed[key].child;
      const newChild = newKeyed[key].child;
      const dom = parentRoot.childNodes[oldKeyed[key].index];
      if (dom) {
        updateProps(dom, oldChild.props, newChild.props);
        diff(oldChild, newChild, dom);
      }
    }
  });

  // ADD
  newChildren.forEach((child, i) => {
    const key = child?.props?.key;
    if (key != null && !(key in oldKeyed)) {
      const newDom = createDom(child);
      const refNode = parentRoot.childNodes[i] || null;
      parentRoot.insertBefore(newDom, refNode);
    }
  });

  // key 없는 자식은 인덱스 기반으로 updateProps 및 diff 적용
  newChildren.forEach((newChild, i) => {
    const oldChild = oldChildren[i];
    const dom = parentRoot.childNodes[i];

    const hasKey = newChild?.props?.key != null;

    if (!hasKey && oldChild && dom) {
      updateProps(dom, oldChild.props, newChild.props);
      diff(oldChild, newChild, dom);
    }
  });
}

// dom props update
export function updateProps(dom, oldProps = {}, newProps = {}) {
  if (!dom) return;
  applyProps(dom, oldProps, newProps, dom.vdom);
}

export function normalizeChildren(vnode) {
  const children = Array.isArray(vnode.props?.children)
    ? vnode.props.children
    : [vnode.props?.children];
  return children.filter((x) => x !== false && x !== null && x !== undefined);
}

function updateHandler(dom, eventType, nextHandler) {
  dom._handlers = dom._handlers || {};
  const prevHandler = dom._handlers[eventType];

  if (prevHandler === nextHandler) return;

  if (prevHandler) {
    dom.removeEventListener(eventType, prevHandler);
  }
  dom._handlers[eventType] = nextHandler;
  dom.addEventListener(eventType, nextHandler);
}

export function applyProps(dom, oldProps = {}, newProps = {}, vdom = null) {
  Object.keys(newProps).forEach((key) => {
    if (key === "children" || oldProps[key] === newProps[key]) return;

    if (key === "value" && dom.tagName === "INPUT") {
      if (dom.value !== newProps[key]) {
        dom.value = newProps[key];
      }
    } else if (key === "checked" && dom.tagName === "INPUT") {
      if (dom.checked !== newProps[key]) {
        dom.checked = newProps[key];
      }
    } else if (key.startsWith("on") && typeof newProps[key] === "function") {
      let eventType = key.toLowerCase().substring(2);
      if (eventType === "change" && dom.tagName === "INPUT") {
        eventType = "input";
      }

      // 기존 handler 제거 후 새로 바인딩 (이벤트 handler 최신으로 교체)
      updateHandler(dom, eventType, newProps[key]);

      // 이벤트 위임 저장
      if (dom.vdom && dom.vdom.events) {
        dom.vdom.events[eventType] = newProps[key];
      }
    } else {
      if (dom.nodeType === 1) {
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

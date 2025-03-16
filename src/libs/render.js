export function render(vdom, container) {
  if (!vdom) return;

  const dom =
    typeof vdom === "string" || typeof vdom === "number"
      ? document.createTextNode(vdom)
      : document.createElement(vdom.type);

  if (vdom.props) {
    // 이벤트 핸들러인 경우 이벤트 리스너 추가
    // 일반 props는 해당 요소에 적용
    Object.keys(vdom.props)
      .filter((key) => key != "children")
      .forEach((key) => {
        if (key.startsWith("on") && typeof vdom.props[key] === "function") {
          dom.addEventListener(key.toLowerCase().substring(2), vdom.props[key]);
        } else {
          dom[key] = vdom.props[key];
        }
      });

    // children 렌더링
    const children = vdom.props.children;
    if (children) {
      if (Array.isArray(children)) {
        children.forEach((child) => render(child, dom));
      } else {
        render(children, dom);
      }
    }
  }

  container.appendChild(dom);
}

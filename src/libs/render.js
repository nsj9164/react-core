export function render(vdom, container) {
  if (!vdom) return;

  const dom =
    typeof vdom === "string" || typeof vdom === "number"
      ? document.createTextNode(vdom)
      : document.createElement(vdom.type);

  if (vdom.props) {
    Object.keys(vdom.props)
      .filter((key) => key != "children")
      .forEach((key) => {
        if (key.startsWith("on") && typeof vdom.props[key] === "function") {
          // console.log("이벤트 핸들러 추가됨 -> key:", key);
          dom.addEventListener(key.toLowerCase().substring(2), vdom.props[key]);
        } else {
        }
      });

    // children 렌더링
    const children = vdom.props.children;
    if (!children) return container.appendChild(dom);

    if (Array.isArray(children)) {
      children.forEach((child) => render(child, dom));
    } else {
      render(children, dom);
    }
  }

  container.appendChild(dom);
}

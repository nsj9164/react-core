export function render(vdom, container) {
  if (!vdom) return;

  const dom =
    typeof vdom === "string" || typeof vdom === "number"
      ? document.createTextNode(vdom)
      : document.createElement(vdom.type);

  if (vdom.props) {
    Object.keys(vdom.props)
      .filter((key) => key !== "children")
      .forEach((key) => {
        if (key.startsWith("on") && typeof vdom.props[key] === "function") {
          const eventType = key.toLowerCase().substring(2);

          if (eventType === "change") {
            dom.addEventListener("input", vdom.props[key]);
          } else {
            dom.addEventListener(eventType, vdom.props[key]);
          }
        } else {
          dom[key] = vdom.props[key];
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

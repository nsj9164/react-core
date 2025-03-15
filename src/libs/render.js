export function render(vdom, container) {
  console.log("@#", vdom, container);
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
          dom.addEventListener(key.toLowerCase().substring(2), vdom.props[key]);
        } else {
          dom[key] = vdom.props[key];
        }
      });

    const children = vdom.props.children;
    if (children) {
      if (Array.isArray(vdom.props.children)) {
        vdom.props.children.forEach((child) => render(child, dom));
      } else {
        render(vdom.props.children, dom);
      }
    }
  }

  container.appendChild(dom);
}

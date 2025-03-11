import { Fragment } from "./jsx-runtime";

export function createElement(type, props) {
  const { key, children, ...restProps } = props;

  if (type === Fragment) {
    return children;
  }

  if (type.prototype && type.prototype.render) {
    const instance = new type(props);
    return instance.render();
  }

  if (typeof type === "function") {
    return type({ key, children, ...restProps });
  }

  return {
    type,
    key: key,
    props: { children, ...restProps },
  };
}

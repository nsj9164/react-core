import { Fragment } from "./jsx-runtime";

export function createElement(type, props) {
  const { children, ...restProps } = props;
  const flatChildren = Array.isArray(children) ? children.flat() : children;

  const elementProps = {
    ...restProps,
    children: flatChildren,
  };

  if (type === Fragment) {
    return flatChildren;
  }

  if (typeof type === "function") {
    return type(elementProps);
  }

  return {
    type,
    props: elementProps,
  };
}

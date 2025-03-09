export function createElement(type, props, ...children) {
  console.log(type, props, ...children);
  const newProps = {
    ...props,
    children: children.length === 1 ? children[0] : children,
  };

  if (typeof type === "function") {
    return type(newProps);
  }

  return {
    type,
    key: props?.key ?? null,
    props: newProps,
  };
}

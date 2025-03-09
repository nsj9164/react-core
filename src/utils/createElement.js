export function createElement(type, props) {
  if (typeof type === "function") {
    return type(props);
  }

  return {
    type,
    key: props?.key ?? null,
    props,
  };
}

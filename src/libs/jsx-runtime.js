import { createElement } from "./createElement";

export const Fragment = Symbol("Fragment");

export function jsx(type, props, key) {
  return createElement(type, { ...props, key });
}

export function jsxs(type, props, key) {
  return createElement(type, { ...props, key });
}

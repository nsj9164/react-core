import { createElement } from "./utils/createElement";
function Header() {
  return createElement("div", {
    className: "header",
    onClick: () => console.log("This is the header!")
  }, createElement("h3", null, "--Header--"), createElement("p", null, "This is the header!"));
}
function Content() {
  return createElement("div", {
    className: "content",
    onClick: () => console.log("This is the content!")
  }, createElement("h3", null, "--Content--"), createElement("p", null, "This is the content!"));
}
function App() {
  return (
    // <div className="app" onClick={() => console.log("This is the App!")}>
    createElement(Fragment, null, createElement("h1", {
      className: "world"
    }, "Hello World"), createElement("hr", null), createElement(Header, null), createElement(Content, null))
  );
}
export default App;

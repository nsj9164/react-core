import { createElement } from "./utils/createElement";

function Header() {
  return (
    <div className="header" onClick={() => console.log("This is the header!")}>
      <h3>--Header--</h3>
      <p>This is the header!</p>
    </div>
  );
}

function Content() {
  return (
    <div
      className="content"
      onClick={() => console.log("This is the content!")}
    >
      <h3>--Content--</h3>
      <p>This is the content!</p>
    </div>
  );
}

function App() {
  return (
    <div className="app" onClick={() => console.log("This is the App!")}>
      <h1 className="world">Hello World</h1>
      <hr />
      <Header />
      <Content />
    </div>
  );
}
export default App;

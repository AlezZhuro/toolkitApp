import ReactDOM from "react-dom/client";
import "./index.css";
import { configure } from "mobx";
import { App } from "./App.tsx";

configure({ enforceActions: "always" });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);

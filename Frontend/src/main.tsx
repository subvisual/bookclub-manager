import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root");
// Tenho que assegurar no caso de root não existir por causa do lint
if (!root) throw new Error("Root not found");

createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./app/layout/styles.scss";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.querySelector("#root");

const render = () => {
	ReactDOM.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
		rootElement
	);
};

if (module.hot) {
	module.hot.accept("./app/layout/App", () => setTimeout(render));
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

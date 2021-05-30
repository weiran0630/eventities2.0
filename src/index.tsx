import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

import "./app/layout/styles.scss";
import App from "./app/layout/App";
import store from "./app/store";
import ScrollToTop from "./app/layout/ScrollToTop";

const rootElement = document.querySelector("#root");

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<ScrollToTop />
				<App />
			</BrowserRouter>
		</Provider>,
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

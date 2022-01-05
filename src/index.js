import { WeatherView } from "./js/weatherView";
import "./css/style.css";

const appContainer = document.querySelector("#app");
const view = new WeatherView(appContainer);
view.updateView();

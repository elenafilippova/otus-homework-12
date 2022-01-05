import WeatherController from "./weatherController";

export class WeatherView {
  constructor(appDiv) {
    this.weatherController = new WeatherController();
    this.appDiv = appDiv;

    const weatherContainerDiv = document.createElement("div");
    weatherContainerDiv.classList.add("weather-container");
    this.weatherContainerDiv = weatherContainerDiv;
    this.appDiv.appendChild(weatherContainerDiv);

    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", async (ev) => {
      ev.preventDefault();

      const inputEl = document.getElementById("search-input");
      const cityName = inputEl.value;
      inputEl.value = "";

      if (cityName !== "") {
        const resultIsOk = await this.weatherController.addWeatherItem(cityName);
        if (resultIsOk) {
          this.updateView();
        }
      }
    });
  }

  updateView() {
    this.weatherContainerDiv.innerHTML = "";
    this.updateWeatherInfo();
    this.updateGoogleMap();
    this.updateCityList();
  }

  updateWeatherInfo() {
    const weatherDiv = document.createElement("div");
    weatherDiv.classList.add("weather");
    if (this.weatherController.weatherItems.length > 0) {
      const weatherItem = this.weatherController.weatherItems[0];
      const cityName = weatherItem.cityName.toString();
      weatherDiv.innerHTML = cityName;
    } else {
      weatherDiv.innerHTML = "Ничего не найдено";
    }
    this.weatherContainerDiv.appendChild(weatherDiv);
  }

  updateGoogleMap() {
    const mapDiv = document.createElement("div");
    mapDiv.classList.add("map");
    mapDiv.innerHTML = "map is here";
    this.weatherContainerDiv.appendChild(mapDiv);
  }

  updateCityList() {
    const cityListDiv = document.createElement("div");
    cityListDiv.classList.add("city-list");
    cityListDiv.innerHTML = "city-list is here";
    this.weatherContainerDiv.appendChild(cityListDiv);
  }
}
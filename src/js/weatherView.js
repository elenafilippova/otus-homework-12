import WeatherController from "./weatherController";
import getNowDateDescription from "./dateHelper";

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
        const resultIsOk = await this.weatherController.addWeatherItem(
          cityName
        );
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
      const selectedWeatherId = +this.weatherController.selectedWeatherId;
      const weatherItem =
        this.weatherController.weatherItems[selectedWeatherId];

      const cityName = weatherItem.cityName.toString();
      if (cityName) {
        const cityNameDiv = document.createElement("div");
        cityNameDiv.classList.add("city-name");
        cityNameDiv.innerText = cityName;
        weatherDiv.appendChild(cityNameDiv);
      }

      const dateTimeNow = getNowDateDescription();
      const dateTimeNowDiv = document.createElement("div");
      dateTimeNowDiv.classList.add("date-time-now");
      dateTimeNowDiv.innerText = dateTimeNow;
      weatherDiv.appendChild(dateTimeNowDiv);

      const picName = weatherItem.weatherIcon.toString();
      if (picName) {
        const imgSrc = `http://openweathermap.org/img/wn/${picName}@2x.png`;
        const img = document.createElement("img");
        img.classList.add("weather-icon");
        img.src = imgSrc;
        weatherDiv.appendChild(img);
      }

      const temperature = +weatherItem.temperature;
      const tempHtml = `${temperature}&deg`;
      const tempDiv = document.createElement("div");
      tempDiv.classList.add("temperature-text");
      tempDiv.innerHTML = tempHtml;
      weatherDiv.appendChild(tempDiv);
    } else {
      weatherDiv.innerHTML =
        "<div class='block-info'>Информация о погоде не найдена</div>";
    }
    this.weatherContainerDiv.appendChild(weatherDiv);
  }

  updateGoogleMap() {
    const mapDiv = document.createElement("div");
    mapDiv.classList.add("map");
    mapDiv.innerHTML = "<div class='block-info'>map is here</div>";
    this.weatherContainerDiv.appendChild(mapDiv);
  }

  updateCityList() {
    const cityListDiv = document.createElement("div");
    cityListDiv.classList.add("city-list");
    cityListDiv.innerHTML = "<div class='block-info'>city-list is here</div>";
    this.weatherContainerDiv.appendChild(cityListDiv);
  }
}

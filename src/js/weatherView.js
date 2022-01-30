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

    this.addEventListeners();
  }

  async initCityList() {
    await this.weatherController.initCityList();
    this.updateView();
  }

  addEventListeners() {
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", async (ev) => {
      ev.preventDefault();

      const inputEl = document.getElementById("search-input");
      const cityName = inputEl.value;
      inputEl.value = "";

      if (cityName !== "") {
        await this.weatherController.addNewWeatherItem(cityName);
        this.updateView();
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

    if (
      this.weatherController.selectedWeatherId === -1 ||
      this.weatherController.weatherItems.length === 0
    ) {
      weatherDiv.innerHTML =
        "<div class='block-info'>Информация о погоде не найдена</div>";
    } else {
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
    }

    this.weatherContainerDiv.appendChild(weatherDiv);
  }

  updateGoogleMap() {
    const mapDiv = document.createElement("div");
    mapDiv.classList.add("map");

    if (this.weatherController.selectedWeatherId === -1) {
      mapDiv.innerHTML = "<div class='block-info'>gogle map not found</div>";
    } else {
      const apiKey = "";
      const weatherItem = this.weatherController.weatherItems[0];
      const requestToGoogleMaps =
        `https://maps.googleapis.com/maps/api/staticmap?` +
        `center=${weatherItem.cityName}` +
        `&zoom=10` +
        `&size=500x500` +
        `&key=${apiKey}`;
      mapDiv.setAttribute("src", requestToGoogleMaps);
    }

    this.weatherContainerDiv.appendChild(mapDiv);
  }

  updateCityList() {
    const cityListDiv = document.createElement("div");
    cityListDiv.classList.add("city-list");

    this.weatherContainerDiv.appendChild(cityListDiv);

    const cityListContainerDiv = document.createElement("div");
    cityListContainerDiv.classList.add("city-list-container");
    cityListDiv.appendChild(cityListContainerDiv);

    if (this.weatherController.weatherItems.length > 0) {
      const citiesList = this.weatherController.weatherItems;
      citiesList.forEach((item, index) => {
        const a = document.createElement("a");
        a.innerText = item.cityName;
        a.classList.add("block-info");
        a.classList.add("city_list_button");
        a.setAttribute("id", index);

        cityListContainerDiv.appendChild(a);

        a.addEventListener("click", async (ev) => {
          ev.preventDefault();
          const itemIndex = +a.getAttribute("id");
          await this.weatherController.updateExistingWeatherItem(
            item.cityName,
            itemIndex
          );
          this.updateView();
        });
      });
    } else {
      cityListContainerDiv.innerHTML =
        "<div class='block-info'>Список городов пока пуст..</div>";
    }
  }
}

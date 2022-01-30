import WeatherItemModel from "./weatherModel";
import { getWeatherByCityName, getUserCurrentCity } from "./apiHelper";
import { readCityList, saveCityList } from "./storageHelper";

export async function GetWeatherItem(cityName) {
  const weather = await getWeatherByCityName(cityName);

  if (weather === null || weather.cod !== 200) {
    return null;
  }
  const geoPosition = null;
  const temperature = Math.ceil(weather.main.temp) - 273;
  const weatherIcon = weather.weather[0].icon;
  return new WeatherItemModel(cityName, geoPosition, temperature, weatherIcon);
}

export default class WeatherController {
  constructor() {
    this.weatherItems = [];
    this.selectedWeatherId = 0;
  }

  async initCityList() {
    this.weatherItems = await readCityList();

    if (!this.weatherItems || this.weatherItems.length === 0) {
      await this.getUserWeather();
    }
  }

  async getUserWeather() {
    const cityName = await getUserCurrentCity();
    if (cityName) {
      await this.addNewWeatherItem(cityName);
    }
  }

  async addNewWeatherItem(cityName) {
    const newItem = await GetWeatherItem(cityName);

    if (newItem == null) {
      this.selectedWeatherId = -1;
      return;
    }

    this.weatherItems.unshift(newItem);
    this.selectedWeatherId = 0;
    const maxArrayLength = 10;
    if (this.weatherItems.length > maxArrayLength) {
      this.weatherItems.pop();
    }
    await saveCityList(this.weatherItems);
  }

  async updateExistingWeatherItem(cityName, index) {
    const weatherItem = await GetWeatherItem(cityName);

    if (weatherItem == null) {
      this.selectedWeatherId = -1;
      return;
    }

    if (this.weatherItems.length > index) {
      this.weatherItems[index] = weatherItem;
    }

    this.selectedWeatherId = index;

    await saveCityList(this.weatherItems);
  }
}

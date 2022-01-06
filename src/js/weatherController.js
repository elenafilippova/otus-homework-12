import WeatherItemModel from "./weatherModel";
import { getWeatherByCityName } from "./apiHelper";

export default class WeatherController {
    constructor() {
      this.lastId = 0;
      this.weatherItems = [];
      this.selectedWeatherId = 0;
    }

    async addWeatherItem(cityName) {
      const weather = await getWeatherByCityName(cityName);
      if (weather === null || weather.cod !== 200) {
        return false;
      } 
        const geoPosition = null;
        const temperature = Math.ceil(weather.main.temp) - 273;
        const weatherIcon = weather.weather[0].icon; 
        const newItem = new WeatherItemModel(cityName, geoPosition, temperature, weatherIcon);
        this.weatherItems.push(newItem);
        this.selectedWeatherId = this.lastId;
        this.lastID += 1;
        return true;  
    }
}


   
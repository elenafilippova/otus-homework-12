import WeatherItemModel from "./weatherModel";
import { getWeatherByCityName } from "./apiHelper";

export default class WeatherController {
    constructor() {
      this.lastID = 0;
      this.weatherItems = [];
      this.selectedWeatherID = 0;
    }

    async addWeatherItem(cityName) {
      const weather = await getWeatherByCityName(cityName);
      if (weather === null || weather.cod !== 200) {
        return false;
      } 
        const geoPosition = null;
        const temperature = Math.ceil(weather.main?.temp ?? 0 - 273);
        const weatherIcon = weather.weather[0].icon; 
        const newItem = new WeatherItemModel(cityName, geoPosition, temperature, weatherIcon);
        this.weatherItems.push(newItem);
        this.lastID += 1;
        this.selectedWeatherID = this.lastID;
        return true;
      
    }
}


   
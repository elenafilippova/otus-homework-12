export async function getWeatherByCityName(cityName) {
  try {
    const apiKey = "8f2c5761371185563563571cb3a56c37";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    return null;
  }
}

export async function getUserCurrentCity() {
  try {
    const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const geoData = await response.json();
    const city = geoData.city.toString();
    return city;
  } catch (error) {
    return null;
  }
}

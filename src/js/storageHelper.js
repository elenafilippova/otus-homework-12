const key = "citylist";

export async function readCityList() {
  const answer = localStorage[key];
  if (!answer) {
    return [];
  }

  return JSON.parse(answer);
}

export async function saveCityList(items) {
  localStorage[key] = JSON.stringify(items);
}

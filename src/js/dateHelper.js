export default function getNowDateDescription() {
  const now = new Date();

  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  let dateDescription = `${days[now.getDay()]}, ${now.getDate()} `;
  dateDescription += `${months[now.getMonth()]} ${now.getFullYear()}, `;
  dateDescription += `${now.getUTCHours()}:${now.getUTCMinutes()}`;

  return dateDescription;
}

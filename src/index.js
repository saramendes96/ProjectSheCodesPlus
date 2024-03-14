let form = document.getElementById("weather-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let inputElement = document.querySelector(".search-input")
  let cityElement = document.querySelector(".current-city");
  
  if (inputElement.value !== "") {
    cityElement.textContent = inputElement.value;
    let apiKey = "ac399aato84e379f39f3cfe3ba24af50";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputElement.value}&key=${apiKey}`;
    axios.get(apiUrl).then(updateTemperature);
  } else {
    cityElement.textContent = "City Not Found";
  }
});

function updateTemperature(response) {
  let temperatureElement = document.querySelector(".current-temperature-value");
  temperatureElement.textContent = Math.round(
    response.data.temperature.current
  );
  let currentDate = new Date();

  let daysofWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentHour = currentDate.getHours().toString().padStart(2, "0");
  let currentTime = currentDate.getMinutes().toString().padStart(2, "0");

  let formattedTime = `${
    daysofWeek[currentDate.getDay()]
  } ${currentHour}:${currentTime}`;

  let cityInput = document.querySelector(".search-input").value;
  let cityName = cityInput.trim();

  let cityElement = document.querySelector(".current-city");
  cityElement.textContent = cityName;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = `${formattedTime}`;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" alt="${response.data.condition.description}" />`; 

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
}

function getForecast(city) {
let apiKey = "ac399aato84e379f39f3cfe3ba24af50";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query={city}&key={apiKey}&units=metric`;
axios(apiUrl).then(displayForecast);
}
  
function displayForecast(response) {
console.log(response.data);
  
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          
          <span class="weather-forecast-temperature">9º</span></div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

getForecast("Paris");


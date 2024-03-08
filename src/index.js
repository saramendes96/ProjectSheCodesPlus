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
  humidityElement.innerHTML = `${response.data.humidity}%`;
}


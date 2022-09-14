//Current time and date 
let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec."
  ];
  let currentmonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentDay = days[date.getDay()];
  let formattedDate = `${currentDay}, ${currentmonth} ${currentDate}, ${formatTime(currentTime)}`;
  return formattedDate;
}

function formatDay(timestamp){
 let date = new Date(timestamp * 1000);
 let day = date.getDay();
 let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
 return days[day];
};

function displayForecast(response){
  let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");

let forecastHtml = `<div class="row">`;
forecast.forEach (function(forecastDay, index){
  if (index < 6){
  forecastHtml = 
  forecastHtml + `
  <div class="col-2">
    <div class="day">${formatDay(forecastDay.dt)}</div>
    <div class="daytemperature">
      <span class="temp-max">${Math.round(forecastDay.temp.max)}°</span>
      <span class="justElement"> | </span>
      <span class="temp-min"><strong>${Math.round(forecastDay.temp.min)}°</strong></span>
      </div>
      <img src= "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" class="daysImage"/>
      </div>
      `;}
});
    forecastHtml = forecastHtml + `</div>`;
forecastElement.innerHTML = forecastHtml;
};
let newDates = document.querySelector("#date-year");
newDates.innerHTML = `${formatDate(currentTime)}`;

function formatTime(time) {
  let fullTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });

  let formattedTime = `${fullTime}`;
  return formattedTime;
}
let newTime = document.querySelector("#clock");

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let newCity = document.querySelector("#city-name");
  newCity.innerHTML = cityInput.value;
}
let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", showCity);

function getForecast(coordinates){
  let apiKeyNew = "be81f193e065bf5feb2d944c7336968b";
  let apiUrlNew = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKeyNew}`;
axios.get(apiUrlNew).then(displayForecast);
};

function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp);
  document.querySelector("#weather-desc").innerHTML =
  response.data.weather[0].description;
  document.querySelector("#wind-speed").innerHTML = Math.round(
  response.data.wind.speed * 3.6);
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

    celsiusTemp = Math.round(response.data.main.temp);
}
// current location
function retrievePosition(position) {
  let apiKey = "b32becf372227220ef6868c3037c0a49";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let getLocation = document.querySelector("#current-location-button");
getLocation.addEventListener("click", getPosition);


//F and C temperature
function celsiusConverter(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".temperature");
tempElement.innerHTML = Math.round(celsiusTemp);
}
function fahrenheitConverter(event) {  
  event.preventDefault();
  let tempElement = document.querySelector(".temperature");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  tempElement.innerHTML=fahrenheitTemp;
}

let celsiusTemp = null;

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", celsiusConverter);

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", fahrenheitConverter);

function searchCity(city) {
  let apiKey = "272e268bfc9a6f270688f54aeff8ae68";
  let unit = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data";
  let apiUrl = `${apiEndPoint}/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

searchCity("Odesa");
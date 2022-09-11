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


function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp);
  document.querySelector("#weather-desc").innerHTML =
  response.data.weather[0].description;
  document.querySelector("#wind-speed").innerHTML = Math.round(
  response.data.wind.speed * 3.6);
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
searchCity("Odesa");

//Change of the weather icon
let iconElement = document.querySelector("#icon");  
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/10d@2x.png`);

//F and C temperature
function celsiusConverter() {
  let number = document.querySelector(".temperature");
  number.innerHTML = "31";
}
function fahrenheitConverter() {
  let number = document.querySelector(".temperature");
  let temp = number.innerHTML;
  number.innerHTML = Math.round((temp * 9) / 5 + 32);
}

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

let searchButton = document.querySelector("identify-city");
searchButton.addEventListener("click", handleSubmit);
const apiKey = "f2860bf6a1e72f6f74a8afe5360186d7";
const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=`;

const search = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const temp = document.querySelector(".temp");
const cityname = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const errorMsg = document.querySelector(".error");
const weatherDiv = document.querySelector(".weather");
const weatherIconImg = document.querySelector(".weather-icon");
 console.log(weatherIconImg.src);
// console.log(searchBtn);
searchBtn.addEventListener("click", () => {
  checkWeather(search.value);
});

async function checkWeather(city) {
  const response = await fetch(url + city);
  let data = await response.json();
//   console.log(data.message);
  if (data.message === "city not found") {
    errorMsg.style.display = "block";
    weatherDiv.style.display = "none";
  } else {
    console.log(data.weather[0].main);
    if (data.weather[0].main == 'Haze') {
        weatherIconImg.src = 'image/haze.png';
    }else if (data.weather[0].main == 'Fog') {
        weatherIconImg.src = 'image/fog.png';
    }else if (data.weather[0].main == 'Clouds') {
        weatherIconImg.src = 'image/clouds.png';
    }else if (data.weather[0].main == 'Smoke') {
        weatherIconImg.src = 'image/smog.png';
    }else if (data.weather[0].main == 'Mist') {
        weatherIconImg.src = 'image/mist.png';
    }else if (data.weather[0].main == 'Rain') {
        weatherIconImg.src = 'image/rain.jpg';
    }
    cityname.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°C";

    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed +' km/h';
    errorMsg.style.display = "none";
    weatherDiv.style.display = "block";
  }
  // console.log(data);
}

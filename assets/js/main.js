async function showWeather(event) {
  const searchPlace = document.getElementById("searchPlace").value;
  const temperature = document.querySelector(".showTemperature");
  const feelsLike = document.querySelector(".feelsLike");
  let cityName = document.querySelector(".weatherCity");
  const humidity = document.querySelector(".humidity");
  const windSpeed = document.querySelector(".windSpeed");
  const SunRiseTimeCal = document.querySelector(".SunRiseTimeCal");
  const SunsetTimeCal = document.querySelector(".SunsetTimeCal");
  const timeShower = document.querySelector(".timeShower");
  event.preventDefault();
  if (searchPlace === "") {
    alert("Search Place cannot be empty");
  } else {
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${searchPlace}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "711296681emsh7e925377a3f67c5p14423fjsn960c4b9b04f3",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      if (
        result.temp !== undefined &&
        result.humidity !== undefined &&
        result.wind_speed !== undefined
      ) {
        let unixTimeStamp = result.sunrise;
        let sunrisedata = new Date(unixTimeStamp * 1000);
        let sunriseTime = sunrisedata.toLocaleTimeString([], {
          timeStyle: "short",
        });

        let unixTimeStampSunset = result.sunset;
        let sunSetTimeConv = new Date(unixTimeStampSunset * 1000);
        let sunsetTime = sunSetTimeConv.toLocaleTimeString([], {
          timeStyle: "short",
        });

        let currentTime = new Date();
        let currentTimeConversion = currentTime.toLocaleTimeString([], {
          timeStyle: "short",
        });
        // console.log(currentTimeConversion);

        // var dateWithoutSecond = new Date();
        // dateWithoutSecond.toLocaleTimeString;

        temperature.textContent = result.temp + " °C";
        timeShower.textContent = currentTimeConversion;
        feelsLike.textContent = result.feels_like + " °C";
        humidity.textContent = result.humidity + " %";
        windSpeed.textContent = result.wind_speed + " km/h";
        SunRiseTimeCal.textContent = sunriseTime;
        SunsetTimeCal.textContent = sunsetTime;
        cityName.textContent = searchPlace;
        console.log(result.city);

        document.querySelector(".weather__card").style.display = "flex";
        timeShower.style.display = "block";
      } else {
        alert("City does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
// const tempeature = document.querySelector(".showTemp");

// console.log(sunriseTime);

// const sunriseSunset = document.querySelector("sunRise__Sunset");
// console.log(result.temp);
// console.log("The sunset time is", sunsetTime);

// getWeather();

// searchBtn.addEventListener("click", () => {
//   getWeather();
// });

// const showWeather = (e) => {

// };

// let h1 = document.createElement("h1");
// let p = document.createElement("p");
// let sunrise = document.createElement("span");
// let sunset = document.createElement("span");
// h1.textContent = result.temp + " °C";
// p.textContent = result.humidity;
// sunrise.textContent = sunriseTime;
// sunset.textContent = sunsetTime;
// tempeature.appendChild(h1);
// tempeature.appendChild(p);
// tempeature.appendChild(sunrise);
// tempeature.appendChild(sunset);
// const searchBtn = document.querySelector(".btn");
// console.log(searchBtn);
// console.log("The place is", searchPlace);

// let sun = document.createElement("li");
// sun.textContent = sunriseTime;
// console.log(sun);
// sunriseSunset.appendChild("sun");
// sunriseSunset.appendChild("sunSet");

// tempeature.appendChild(time);

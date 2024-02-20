const validate = (searchPlace) => {
  let inputRegex = /^[A-Za-z\s]+$/;
  return inputRegex.test(searchPlace);
};

async function showWeather(event) {
  const searchPlace = document.getElementById("searchPlace").value.trim();
  console.log(validate(searchPlace));
  const temperature = document.querySelector(".showTemperature");
  const feelsLike = document.querySelector(".feelsLike");
  let cityName = document.querySelector(".weatherCity");
  const humidity = document.querySelector(".humidity");
  const windSpeed = document.querySelector(".windSpeed");
  const SunRiseTimeCal = document.querySelector(".SunRiseTimeCal");
  const SunsetTimeCal = document.querySelector(".SunsetTimeCal");
  const timeShower = document.querySelector(".timeShower");
  event.preventDefault();

  if (!validate(searchPlace) || searchPlace === "") {
    alert(
      "Search Place should be in characters and spaces only, and cannot be empty or in numbers."
    );
    document.getElementById("searchPlace").value = " ";
    return;
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
        temperature.textContent = result.temp + " °C";
        timeShower.textContent = currentTimeConversion;
        feelsLike.textContent = result.feels_like + " °C";
        humidity.textContent = result.humidity + " %";
        windSpeed.textContent = result.wind_speed + " km/h";
        SunRiseTimeCal.textContent = sunriseTime;
        SunsetTimeCal.textContent = sunsetTime;
        cityName.textContent = searchPlace;

        document.querySelector(".weather__card").style.display = "flex";
        timeShower.style.display = "block";
        document.getElementById("searchPlace").value = " ";
      } else {
        alert("City does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

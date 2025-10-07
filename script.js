import apiKey from "./config.js";


 
 const cityName = document.getElementById("cityName");
 const searchBtn = document.getElementById("searchBtn");
 const weatherInfo = document.getElementById("weatherInfo");

 searchBtn.addEventListener("click" ,() => {
     const city = cityName.value.trim()
      
    if(city==="") {
        weatherInfo.innerHTML= "<p>please enter a city name</P>"
        return;
    }

    getweather(city);
 });

 async function getweather(city) {
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        

        const response = await fetch(url)
        const data = await response.json()
        

        if(data.cod===200){
            const{name, main , weather , wind} = data

            weatherInfo.innerHTML=`
            <h2>${name}</h2>
            <p> Temperature: ${main.temp}°C</p>
        <p> Humidity: ${main.humidity}%</p>
        <p> Wind Speed: ${wind.speed} m/s</p>
        <p> Condition: ${weather[0].description}</p>
      `;

            localStorage.setItem("lastCity", city);
    } else {
      weatherInfo.innerHTML = `<p>❌ City not found. Try again!</p>`;
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    weatherInfo.innerHTML = `<p>⚠️ Something went wrong. Please try again later.</p>`;
  }
}


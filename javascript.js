
if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(updateMeteo);
} else { 
     console.log("da decidere");
}

function darkMode() {
     /*var prova = document.getElementById("myCarousel");
     document.getElementById("darkModeSwitch") == true ? document.getElementById("myCarousel").class = "carousel carousel-dark slide" : document.getElementById("myCarousel").class = "carousel slide";
     console.log(prova); */1
}

async function citySuggestion() {
     var selectedCity = document.getElementById("selectedCity").value;
     if (selectedCity) {
          var response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + document.getElementById("selectedCity").value + "&limit=100&appid=1e483a47411a3f6a6cc71c3603f53f7b&units=metric&lang=it",{method:"GET"});
          var jsonCities = await response.json();
          var cities = document.getElementById("suggestedCities");
          cities.innerHTML = "";
          // console.log(jsonCities);
          jsonCities.forEach(city => {
               var opt = document.createElement("option");
               opt.innerText = city.name + (city.state ? ", " + city.state : "") + (city.country ? ", " + city.country : ""); 
               opt.setAttribute("lat", city.lat);
               opt.setAttribute("lon", city.lon);
               cities.appendChild(opt);
          });
     }
}

async function updateMeteo(position) {
     var response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=1e483a47411a3f6a6cc71c3603f53f7b&units=metric&lang=it",{method:"GET"});
     var weather = await response.json();
     // console.log(weather);
     var scheda = document.getElementById("weather");
     scheda.getElementsByTagName("h1")[0].innerText = weather.name;
     scheda.getElementsByTagName("p")[0].innerText = "Condizioni: " + weather.weather[0].description;
}

function getWeather() {
     var position = {
          coords : {
               "latitude": document.getElementById("suggestedCities").options[0].getAttribute("lat"),
               "longitude": document.getElementById("suggestedCities").options[0].getAttribute("lon") 
          }
     }
     updateMeteo(position);

     
}


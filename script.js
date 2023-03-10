const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

//getting all the ui elements at the top which are required

search.addEventListener('click', () => {                                        // adding event listener to the search icon
    const APIKey = "6a281a676d346e22a675e6a473e71fc2";
    const city = document.querySelector(".search-box input").value;

    if (city === '')
        return;


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)          // this is for checking the api 
        .then(response => response.json()).then(json => {                                           //first we are converting the api response to json then we are using the json to validate our needful response
                    if (json.cod === '404') {                                                           //checking for status code inside api's json response..!
                        container.style.height = "400px";
                        weatherBox.style.display = "none";
                        weatherDetails.style.display = "none";
                        error404.style.display = "block";
                        error404.classList.add("fadeIn");
                        return;
                    }

                    error404.style.display = "none";
                    error404.classList.remove("fadeIn");

                    const image = document.querySelector(".weather-box img");
                    const temperature = document.querySelector(".weather-box .temperature");
                    const description = document.querySelector(".weather-box .description");
                    const Humidity = document.querySelector(".weather-details .humidity span");
                    const wind = document.querySelector(".weather-details .wind span");

                    switch (json.weather[0].main) {
                        case "Clear":
                            image.src = "images/clear.png";
                            break;
                        case "Clouds":
                            image.src = "images/cloud.png";
                            break;
                        case "Mist":
                            image.src = "images/mist.png";
                            break;
                        case "Rain":
                            image.src = "images/rain.png";
                            break;
                        case "Snow":
                            image.src = "images/snow.png";
                            break;
                        case "Haze":
                            image.src = "images/haze.png";
                            break;
                        default:
                            image.src ="";
                            break;
                    }

                    temperature.innerHTML = `${parseInt(json.main.temp)}<span>??C</span>`;               //assiging our api response values to each of our html elements
                    description.innerHTML = `${json.weather[0].description}`;
                    Humidity.innerHTML = `${json.main.humidity}<span>%</span>`;
                    wind.innerHTML = `${parseInt(json.wind.speed)}<span>Km/h</span>`;


                    weatherBox.style.display ="";
                    weatherDetails.style.display = "";
                    weatherBox.classList.add("fadeIn");
                    weatherDetails.classList.add("fadeIn");

                    container.style.height = "600px";



                })

});


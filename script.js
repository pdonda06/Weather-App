const apiKey = '9a320bc6fd62964d4773ab8e348cff2e';
        const searchButton = document.getElementById('searchButton');
        const locationInput = document.getElementById('locationInput');
        const weatherInfo = document.getElementById('weatherInfo');
        const cityName = document.getElementById('cityName');
        const weatherDescription = document.getElementById('weatherDescription');
        const temperature = document.getElementById('temperature');
        const minTemp = document.getElementById('minTemp');
        const maxTemp = document.getElementById('maxTemp');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('windSpeed');
        const errorContainer = document.getElementById('errorContainer');
        const errorMessage = document.getElementById('errorMessage');

        searchButton.addEventListener('click', () => {
            getWeatherData(locationInput.value);
        });

        locationInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                getWeatherData(locationInput.value);
            }
        });

        function getWeatherData(location) {
            // Clear previous error messages
            errorContainer.classList.add('hidden');
            errorMessage.textContent = '';

            // Make an API request to OpenWeatherMap
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('City not found');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Display weather data
                    cityName.textContent = `${data.name}, ${data.sys.country}`;
                    weatherDescription.textContent = data.weather[0].description;
                    temperature.textContent = data.main.temp;
                    minTemp.textContent = data.main.temp_min;
                    maxTemp.textContent = data.main.temp_max;
                    humidity.textContent = data.main.humidity;
                    windSpeed.textContent = data.wind.speed;
                    weatherInfo.classList.remove('hidden');
                })
                .catch((error) => {

                    errorMessage.textContent = error.message;
                    errorContainer.classList.remove('hidden');
                    weatherInfo.classList.add('hidden');
                });
        }

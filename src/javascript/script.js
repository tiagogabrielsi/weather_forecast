document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const city_name = document.querySelector('#city_name').value;

    if (!city_name) {
        document.querySelector('#weather').classList.remove('show');
        showAlert('Por favor, digite o nome da cidade');
        return;
    }

    const apiKey = '15ebe0836199343869b6d3189832c390';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city_name)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const result = await fetch(apiUrl);
    const json = await result.json();

    if (json.cod === 200 || json.cod === '200') {
        showInfo({city: json.name, country: json.sys.country, temp: json.main.temp, temp_max: json.main.temp_max, temp_min: json.main.temp_min, description: json.weather[0].description, tempIcon: json.weather[0].icon, humidity: json.main.humidity, wind: json.wind.speed});
    } else {
        document.querySelector('#weather').classList.remove('show');
        showAlert('Cidade não encontrada... <img src="src/image/image.png" />');
    }
});

function showInfo(json) {
    showAlert('');
    document.querySelector('#weather').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#temp_img').src = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`;
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(0)}°C`;
    document.querySelector('#temp_description').innerHTML = json.description;
    document.querySelector('#temp_max').innerHTML = `${json.temp_max.toFixed(0)}°C`;
    document.querySelector('#temp_min').innerHTML = `${json.temp_min.toFixed(0)}°C`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.wind.speed.toFixed(0)} km/h`;
}

function showAlert(msg) {
    document.querySelector('#error').innerHTML = msg;
}

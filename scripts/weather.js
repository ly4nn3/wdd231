const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.76&lon=6.68&appid=95767b3100bfaadd643e1a5596570421&units=metric';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('SRC', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    captionDesc.textContent = `${desc}`;
}

apiFetch();
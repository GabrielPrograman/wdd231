document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const menuBtn = document.getElementById('menu-btn');
const primaryNav = document.getElementById('primary-nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        primaryNav.classList.toggle('hidden');
    });
}

const myKey = "7bf896c0e407fa599f0162c6fea1a269";
const myLat = "16.77";
const myLong = "-3.00";

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            const currentContainer = document.getElementById('current-weather');
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description;

            const descCapitalized = desc.charAt(0).toUpperCase() + desc.slice(1);

            currentContainer.innerHTML = `
            <p><strong>${temp}&deg;C</strong></p>
            <p>${descCapitalized}</p>

            `;
        }

        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            const forecastContainer = document.getElementById('weather-forecast');

            const dailyData = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

            let forecastHTML = '';
            dailyData.forEach(day => {
                const date = new Date(day.dt_txt);
                const dayName = date.toLocaleDateString('en-US', {weekday: 'short'});
                const dayTemp = Math.round(day.main.temp);
                forecastHTML += `<p><strong>${dayName}:</strong> ${dayTemp}&deg;C</p>`;
            });

            forecastContainer.innerHTML = forecastHTML;
        }

    } catch (error) {
         console.error("Error fetching weather data:", error);
         document.getElementById('current-weather').innerHTML = `<p>Error loading weather.</p>`;
    }
  }

  const membersUrl = "../data/members.json";

  async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();

            const qualifiedMembers = data.filter(member =>
                member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver' || member.level === 'Gold' || member.level === 'Silver'
            );

            qualifiedMembers.sort(() => 0.5 - Math.random());

            const selectedMembers = qualifiedMembers.slice(0, 3);

            const spotlightContainer = document.getElementById('spotlight-container');
            spotlightContainer.innerHTML = '';

            selectedMembers.forEach(member => {
                let spotlightItem = document.createElement('div');
                spotlightItem.className = 'spotlight-item';

                spotlightItem.innerHTML = `
                <h3>${member.name}</h3>
                <img src="${member.image}" alt="Logo of ${member.name}">
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>

              `;

              spotlightContainer.appendChild(spotlightItem);
            });
        
    } else {
        throw Error(await response.text());
       }
    } catch (error) {
       console.error("Error fetching members:", error);
       document.getElementById('spotlight-container').innerHTML = `<p>Error loading spotlights.</p>`;

    }
}


fetchWeather();
getSpotlights();
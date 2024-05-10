document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.weather.gov/gridpoints/SEW/131,123/forecast')
        .then(response => response.json())
        .then(data => {
            const filteredPeriods = data.properties.periods.filter(period => !period.name.toLowerCase().includes('night'));
            const forecastDiv = document.getElementById("forecast");
            filteredPeriods.forEach(period => {
                const section = document.createElement('section');
                let imgSrc = './imgs/partialsun.png';
                if (period.shortForecast.toLowerCase().includes('slight chance rain showers')) {
                    imgSrc = './imgs/halfrain.png';
                } else if(period.shortForecast.toLowerCase().includes('clear')) {
                    imgSrc = './imgs/clear.jpg';
                } else if(period.shortForecast.toLowerCase().includes('partly sunny')) {
                    imgSrc = './imgs/partialsun.png';
                } else if(period.shortForecast.toLowerCase().includes('sunny')) {
                    imgSrc = './imgs/sun.png';
                }
                section.innerHTML = `
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="square">
                            <div class="card mb-3 col" id="weatherCards";>
                                <img src="${imgSrc}" class="card-img-top" alt="Weather Image">
                                <div class="card-body" style="height: 160px;">
                                    <h5 class="card-title">${period.name}</h5>
                                    <h6 class="card-title">${period.temperature}°F</h6>
                                    <p class="card-text">${period.shortForecast}</p>
                                </div>
                                <div class="card-footer">
                                    <small class="text-body-secondary">Last updated: ${new Date(data.properties.updated).toLocaleString()}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                forecastDiv.appendChild(section);
            });
        })
        .catch(error => console.error("Error loading data: ", error));
});

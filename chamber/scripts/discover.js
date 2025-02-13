async function getPlacesData() {
    try {
        const response = await fetch('./data/places.json');
        if (response.ok) {
            const data = await response.json();
            console.log(`Data loaded`, data); // Debugging in console
            displayPlaces(data.places);
        } else {
            console.error(`Failed data fetch:`, response.status); // Debug
        }
    } catch (error) {
        console.error(`Load error:`, error); // Debug
    }
}

function displayPlaces(places) {
    const grid = document.querySelector('.discover-grid');
    grid.innerHTML = ''; // Clear existing content

    places.forEach((place) => {
        const card = document.createElement('div');
        card.className = 'places-card';
        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="${place.image}" 
                     alt="${place.imageAlt}" 
                     width="300" 
                     height="200" 
                     loading="lazy">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button>Learn More</button>
        `;
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', getPlacesData);
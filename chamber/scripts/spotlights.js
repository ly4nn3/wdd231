const spotlightsContainer = document.getElementById('spotlights-container');

async function getSpotlightData() {
    try {
        const response = await fetch('./data/members.json');
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data.members);
        }
    } catch (error) {
        console.error(`Load error:`, error);
    }
}
function getRandomMembers(members, count) {
    const eligibleMembers = members.filter(member => member.membership >= 2);
    return eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, count);
}

function displaySpotlights(members) {
    if (!spotlightsContainer) return;
    
    const spotlightMembers = getRandomMembers(members, 3);
    
    spotlightMembers.forEach(member => {
        let spotlight = document.createElement('section');
        spotlight.className = 'spotlight-card';

        let membershipTitle = member.membership === 3 ? 'Gold' : 'Silver';

        spotlight.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" width="150">
            <div class="spotlight-content">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.number}</p>
                <p>${membershipTitle} member</p>
                <a href="${member.website} target="_blank">Visit Website</a>
            </div>
        `;
        spotlightsContainer.appendChild(spotlight);
    });
}

getSpotlightData();
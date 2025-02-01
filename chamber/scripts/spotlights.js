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
            <div class="spotlight-content">
                <h4>${member.name}</h4>
                <img src="${member.image}" alt="${member.name} logo" width="150">
                <p>${member.address}</p>
                <p>${member.number}</p>
                <p class="membership">${membershipTitle} member</p>
                <p class="link">Website: <a href="${member.website} target="_blank">${member.website}</a></p>
            </div>
        `;
        spotlightsContainer.appendChild(spotlight);
    });
}

getSpotlightData();
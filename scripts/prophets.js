const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";

const cards = document.querySelector('#cards');
const filters = document.querySelector('#filters');

async function getProphetData() {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        // console.table(data);
        displayProphets(data.prophets);
    }
}

const displayProphets = (prophets) => {
    cards.innerHTML = "";
    prophets.forEach(prophet => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let info = document.createElement('div');
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`

        info.innerHTML = `
            <p>Date of Birth: ${prophet.birthdate}<br>
            Place of Birth: ${prophet.birthplace}</p>
        `;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.fullName} - ${prophet.order} Latter-day Prophet`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(info);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}

const applyFilter = (prophets, filter) => {
    switch (filter) {
        case 'idaho':
            return prophets.filter(prophet => prophet.birthplace.toLowerCase().includes('idaho'));
        case 'nonus':
            return prophets.filter(prophet => prophet.birthplace.toLowerCase().includes('england'));
        case 'years':
            return prophets.filter(prophet => prophet.length >= 15);
        case 'childs':
            return prophets.filter(prophet => prophet.numofchildren <= 4);
        case 'child1':
            return prophets.filter(prophet => prophet.numofchildren >= 10);
        case 'old':
            return prophets.filter(prophet => {
                const birthYear = new Date(prophet.birthdate).getFullYear();
                const deathYear = prophet.death ? new Date(prophet.death).getFullYear() : new Date().getFullYear();
                return deathYear - birthYear >= 95;
            });
        default:
            return prophets;
    }
};

document.querySelector('#all').addEventListener('click', () => getProphetData());
document.querySelector('#idaho').addEventListener('click', () => filterAndDisplay('idaho'));
document.querySelector('#nonus').addEventListener('click', () => filterAndDisplay('nonus'));
document.querySelector('#ten').addEventListener('click', () => filterAndDisplay('years'));
document.querySelector('#childs').addEventListener('click', () => filterAndDisplay('childs'))
document.querySelector('#child1').addEventListener('click', () => filterAndDisplay('child1'));
document.querySelector('#old').addEventListener('click', () => filterAndDisplay('old'));

const filterAndDisplay = (filter) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const filteredProphets = applyFilter(data.prophets, filter);
            displayProphets(filteredProphets);
        });
};

all.addEventListener("click", () => {
	clearButtonClasses();
	getProphets("all");
	all.classList.add("active");
});

getProphetData();
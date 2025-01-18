const businesses = document.getElementById('businesses');
const categories = document.getElementById('categories');

const viewToggle = document.createElement('div');
viewToggle.className = 'view-toggle';
viewToggle.innerHTML = `
    <button id="grid" class="active">
        <img src="images/grid.png" alt="Grid view">
    </button>
    <button id="list">
        <img src="images/list.png" alt="List view">
    </button>
`;

categories.appendChild(viewToggle);

// Default view set to grid
function setDefaultView() {
    businesses.classList.add('grid-view');
    gridBtn.classList.add('active');
}

async function getMembersData() {
    try {
        const response = await fetch('./data/members.json');
        if (response.ok) {
            const data = await response.json();
            console.log(`Data loaded`, data); // Debugging in console
            displayMembers(data.members);
            setDefaultView();
        } else {
            console.error(`Failed data fetch:`, response.status); // Debug
        }
    } catch (error) {
        console.error(`Load error:`, error); // Debug
    }
}

const displayMembers = (members) => {
    console.log(`Display members:`, members); // Debugging
    businesses.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        let card = document.createElement('section');
        card.className = 'member-card';

        let image = document.createElement('img');
        let cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        let name = document.createElement('h3');
        let address = document.createElement('p');
        let number = document.createElement('p');
        let type = document.createElement('p');
        let membershipLevel = document.createElement('p');
        let website = document.createElement('a');
    
        let membershipTitle;
        switch(member.membership) {
            case 3:
                membershipTitle = 'Gold';
                break;
            case 2:
                membershipTitle = 'Silver';
                break;
            default:
                membershipTitle = 'Bronze';
        }

        image.src = member.image;
        image.alt = `${member.name} logo`;
        name.textContent = member.name;
        address.textContent = member.address;
        number.textContent = member.number;
        type.textContent = `${member.type}`;
        membershipLevel.textContent = `${membershipTitle} member`;
        website.href = member.website;
        website.textContent = 'Visit Website';
        website.target = '_blank';

        type.setAttribute('data-type', 'type');
        website.setAttribute('data-type', 'website');
        membershipLevel.setAttribute('data-type', 'membership');

        cardContent.appendChild(name);
        cardContent.appendChild(address);
        cardContent.appendChild(number);
        cardContent.appendChild(type);
        cardContent.appendChild(membershipLevel);
        cardContent.appendChild(website);

        card.appendChild(image);
        card.appendChild(cardContent);
        
        businesses.appendChild(card);
    });
}

const gridBtn = document.getElementById('grid');
const listBtn = document.getElementById('list');

gridBtn.addEventListener('click', () => {
    businesses.classList.remove('list-view');
    businesses.classList.add('grid-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');

    document.querySelectorAll('.member-card').forEach(card => {
        const content = card.querySelector('.card-content');
        const type = content.querySelector('[data-type="type"]');
        const website = content.querySelector('[data-type="website"]');
        const membership = content.querySelector('[data-type="membership"]');

        content.insertBefore(membership, website);
    });
});

listBtn.addEventListener('click', () => {
    businesses.classList.remove('grid-view');
    businesses.classList.add('list-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');

    document.querySelectorAll('.member-card').forEach(card => {
        const content = card.querySelector('.card-content');
        const type = content.querySelector('[data-type="type"]');
        const website = content.querySelector('[data-type="website"]');
        const membership = content.querySelector('[data-type="membership"]');

        content.insertBefore(website, type.nextSibling);

        content.appendChild(membership);
    });
});

getMembersData();

JAVASCRIPT

Collapse
// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
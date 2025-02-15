export async function initializeEvents() {
    try {
        const events = await fetchEvents();
        displayEvents(events);
        setupFilterButtons(events);
    } catch (error) {
        console.error('Error initializing events:', error);
        displayError('Failed to load events. Please try again later.');
    }
}

async function fetchEvents() {
    try {
        const response = await fetch('./data/events.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch events: ${error.message}`);
    }
}

function displayEvents(events) {
    const eventGrid = document.getElementById('event-grid');
    eventGrid.innerHTML = ''; // Clear existing content

    if (events.length === 0) {
        displayNoEvents(eventGrid);
        return;
    }

    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventGrid.appendChild(eventCard);
    });
}

function displayNoEvents(container) {
    container.innerHTML = '<p class="no-events">No events found.</p>';
}

function createEventCard(event) {
    const card = document.createElement('article');
    card.className = 'event-card';

    card.innerHTML = `
        <img src="${event.image}" alt="${event.imageAlt}" class="event-image" width="300" loading="lazy">
        <div class="event-content">
            <h3>${event.title}</h3>
            ${createEventDates(event)}
            <p class="event-details">${event.details}</p>
            ${createRewardsList(event.rewards)}
            ${event.subEvents ? createSubEventsList(event.subEvents) : ''}
        </div>
    `;

    return card;
}

function createEventDates(event) {
    return `
        <div class="event-dates">
            <p>Start: ${formatDate(event.startDate)}</p>
            <p>End: ${formatDate(event.endDate)}</p>
        </div>
    `;
}

function createRewardsList(rewards) {
    if (!rewards?.length) return '';
    
    return `
        <div class="event-rewards">
            <h4>Rewards:</h4>
            <ul>
                ${rewards.map(reward => `<li>${reward}</li>`).join('')}
            </ul>
        </div>
    `;
}

function createSubEventsList(subEvents) {
    if (!subEvents) return '';

    return `
        <div class="sub-events">
            <h4>Sub Events:</h4>
            ${subEvents.map(subEvent => createSubEventCard(subEvent)).join('')}
        </div>
    `;
}

function createSubEventCard(subEvent) {
    return `
        <div class="sub-event">
            <h5>${subEvent.title}</h5>
            <p class="event-dates">Duration: ${formatDate(subEvent.startDate)} - ${formatDate(subEvent.endDate)}</p>
            <p>${subEvent.details}</p>
        </div>
    `;
}

function formatDate(dateString) {
    if (dateString === 'Permanent') return 'Permanent';

    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function setupFilterButtons(events) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            updateFilterButtons(filterButtons, button);
            const filteredEvents = filterEvents(events, button.dataset.filter);
            displayEvents(filteredEvents);
        });
    });
}

function updateFilterButtons(allButtons, activeButton) {
    allButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
}

function filterEvents(events, filterType) {
    const currentDate = new Date();

    const filterFunctions = {
        ongoing: event => isEventOngoing(event, currentDate),
        upcoming: event => isEventUpcoming(event, currentDate),
        ended: event => isEventEnded(event, currentDate),
        default: () => true
    };

    return events.filter(filterFunctions[filterType] || filterFunctions.default);
}

function isEventOngoing(event, currentDate) {
    const startDate = new Date(event.startDate);
    if (event.endDate === 'Permanent') {
        return startDate <= currentDate;
    }
    const endDate = new Date(event.endDate);
    return startDate <= currentDate && endDate >= currentDate;
}

function isEventUpcoming(event, currentDate) {
    return new Date(event.startDate) > currentDate;
}

function isEventEnded(event, currentDate) {
    if (event.endDate === 'Permanent') return false;
    return new Date(event.endDate) < currentDate;
}

// Error handling
function displayError(message) {
    const eventGrid = document.getElementById('event-grid');
    eventGrid.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
        </div>
    `;
}
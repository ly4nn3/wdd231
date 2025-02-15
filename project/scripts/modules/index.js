// Constants
const DATE_FORMAT_OPTIONS = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

const PREVIEW_LIMITS = {
    events: 3,
    news: 3,
    outfits: 3
};

// Main initialization
export async function initializeHomePage() {
    try {
        const [events, news, outfits] = await Promise.all([
            fetch('./data/events.json').then(response => response.json()),
            fetch('./data/news.json').then(response => response.json()),
            fetch('./data/outfits.json').then(response => response.json())
        ]);

        displayLatestPost(events, news);
        displayRandomOngoingEvents(events);
        displayRecentNews(news);
        displayRandomOutfits(outfits);

    } catch (error) {
        console.error('Error initializing home page:', error);
        displayError('Failed to load content. Please try again later.');
    }
}

// Latest Post Section
function displayLatestPost(events, news) {
    const container = document.getElementById('latest-post');
    if (!container) return;

    const allPosts = combineAndSortPosts(events, news);
    const latestPost = allPosts[0];

    if (!latestPost) {
        container.innerHTML = '<p>No posts available.</p>';
        return;
    }

    container.innerHTML = latestPost.postType === 'event' 
        ? createLatestEventCard(latestPost)
        : createLatestNewsCard(latestPost);
}

function combineAndSortPosts(events, news) {
    return [
        ...events.map(event => ({
            ...event,
            postType: 'event',
            date: event.startDate
        })),
        ...news.map(newsItem => ({
            ...newsItem,
            postType: 'news',
            date: newsItem.date
        }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function createLatestEventCard(event) {
    return `
        <article class="latest-card event-preview">
            <img src="${event.image}" alt="${event.imageAlt}" class="latest-image" width="300" loading="lazy">
            <div class="latest-content">
                <h4>${event.title}</h4>
                <p class="latest-date">Starts: ${formatDate(event.startDate)}</p>
                <p class="latest-preview">${event.details}</p>
                <a href="events.html" class="view-more-btn">View Event Details</a>
            </div>
        </article>
    `;
}

function createLatestNewsCard(newsItem) {
    let preview = Array.isArray(newsItem.details) 
        ? newsItem.details[0].question 
        : newsItem.details;

    return `
        <article class="latest-card news-preview">
            ${newsItem.image ? `
                <img src="${newsItem.image}" alt="${newsItem.imageAlt}" class="latest-image" width="300" loading="lazy">
            ` : ''}
            <div class="latest-content">
                <h4>${newsItem.title}</h4>
                <p class="latest-date">${formatDate(newsItem.date)}</p>
                <p class="latest-preview">${preview}</p>
                <a href="news.html" class="view-more-btn">Read More</a>
            </div>
        </article>
    `;
}

// Event Section
function displayRandomOngoingEvents(events) {
    const container = document.getElementById('events');
    if (!container) return;

    const ongoingEvents = filterOngoingEvents(events);

    if (ongoingEvents.length === 0) {
        container.innerHTML = '<p>No ongoing events at this time.</p>';
        return;
    }

    const randomEvents = getRandomItems(ongoingEvents, PREVIEW_LIMITS.events);
    
    container.innerHTML = `
        <div class="event-preview-grid">
            ${randomEvents.map(event => createEventPreviewCard(event)).join('')}
        </div>
    `;
}

function filterOngoingEvents(events) {
    const currentDate = new Date();
    return events.filter(event => {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        return startDate <= currentDate && endDate >= currentDate;
    });
}

function createEventPreviewCard(event) {
    return `
        <article class="event-preview-card">
            <img src="${event.image}" alt="${event.imageAlt}" class="event-preview-image" width="300" loading="lazy">
            <div class="event-preview-content">
                <h4>${event.title}</h4>
                <div class="event-preview-dates">
                    <p>Until: ${formatDate(event.endDate)}</p>
                </div>
                ${event.rewards ? `
                    <div class="event-preview-rewards">
                        <p>Rewards include:</p>
                        <ul>
                            ${event.rewards.slice(0, 2).map(reward => `
                                <li>${reward}</li>
                            `).join('')}
                            ${event.rewards.length > 2 ? `<li>and more...</li>` : ''}
                        </ul>
                    </div>
                ` : ''}
                <a href="events.html" class="view-more-btn">View Details</a>
            </div>
        </article>
    `;
}

// News Section
function displayRecentNews(news) {
    const container = document.getElementById('news');
    if (!container) return;
    
    const recentNews = [...news]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, PREVIEW_LIMITS.news);

    if (recentNews.length === 0) {
        container.innerHTML = '<p>No news available.</p>';
        return;
    }

    container.innerHTML = `
        <div class="news-preview-list">
            ${recentNews.map(newsItem => createNewsPreviewItem(newsItem)).join('')}
        </div>
        <a href="news.html" class="view-all-btn">View All News</a>
    `;
}

function createNewsPreviewItem(newsItem) {
    let preview = Array.isArray(newsItem.details)
        ? newsItem.details[0].question
        : truncateText(newsItem.details, 100);

    return `
        <article class="news-preview-item">
            <div class="news-preview-content">
                <div class="news-preview-header">
                    <h4>${newsItem.title}</h4>
                    <span class="news-preview-type">${newsItem.type}</span>
                </div>
                <p class="news-preview-date">${formatDate(newsItem.date)}</p>
                <p class="news-preview-text">${preview}</p>
            </div>
            ${newsItem.image ? `
                <img src="${newsItem.image}" alt="${newsItem.imageAlt}" class="news-preview-image" width="300" loading="lazy">
            ` : ''}
        </article>
    `;
}

// Outfits Section
function displayRandomOutfits(outfits) {
    const container = document.querySelector('section:last-child div');
    if (!container) return;
    
    const randomOutfits = getRandomItems(outfits, PREVIEW_LIMITS.outfits);

    if (randomOutfits.length === 0) {
        container.innerHTML = '<p>No outfits available.</p>';
        return;
    }

    container.innerHTML = `
        <h3>Freeway Compendium</h3>
        <div class="outfit-preview-grid">
            ${randomOutfits.map(outfit => createOutfitPreviewCard(outfit)).join('')}
        </div>
        <a href="compendium.html" class="view-all-btn">View All Outfits</a>
    `;
}

function createOutfitPreviewCard(outfit) {
    const qualityDisplay = outfit.type === "Momo" ? 
        '🐱' : 
        '★'.repeat(outfit.quality);
    
    return `
        <article class="outfit-preview-card">
            <div class="outfit-preview-image">
                <img src="${outfit.image}" alt="${outfit.imageAlt}" width="300" loading="lazy">
                <span class="outfit-preview-quality ${outfit.type === "Momo" ? 'momo-quality' : ''}">${qualityDisplay}</span>
                ${outfit.type !== "Momo" && outfit.ability && outfit.ability !== "none" ? 
                    `<span class="outfit-preview-ability">${outfit.ability}</span>` : 
                    ''}
            </div>
            <div class="outfit-preview-content">
                <h4>${outfit.name}</h4>
                ${outfit.type !== "Momo" ? `
                    <div class="outfit-preview-meta">
                        <span class="outfit-preview-style ${outfit.style.toLowerCase()}">${outfit.style}</span>
                        ${outfit.type !== "Other" ? 
                            `<span class="outfit-preview-type">${outfit.type}</span>` : 
                            ''}
                    </div>
                ` : ''}
                <p class="outfit-preview-banner">${outfit.banner}</p>
            </div>
        </article>
    `;
}

// Utility Functions
function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

function displayError(message) {
    ['latest-post', 'events', 'news'].forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <p>${message}</p>
                </div>
            `;
        }
    });
}
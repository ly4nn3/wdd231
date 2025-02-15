const DATE_FORMAT_OPTIONS = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

export async function initializeNews() {
    try {
        const news = await fetchNews();
        setupFilterButtons();
        displayNews(news, 'Latest');
    } catch (error) {
        console.error('Error initializing news:', error);
        displayError('Failed to load news. Please try again later.');
    }
}

async function fetchNews() {
    try {
        const response = await fetch('./data/news.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch news: ${error.message}`);
    }
}

function setupFilterButtons() {
    const buttons = document.querySelectorAll('main div button');
    buttons.forEach(button => {
        initializeButton(button);
        setupButtonListener(button, buttons);
    });
}

function initializeButton(button) {
    button.className = 'filter-btn';
    if (button.textContent === 'Latest') {
        button.classList.add('active');
    }
}

function setupButtonListener(button, allButtons) {
    button.addEventListener('click', async () => {
        updateActiveButton(button, allButtons);
        const news = await fetchNews();
        displayNews(news, button.textContent);
    });
}

function updateActiveButton(activeButton, allButtons) {
    allButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
}

function displayNews(news, filter) {
    const newsSection = document.querySelector('.news-container');
    const filteredNews = filterAndSortNews(news, filter);

    if (filteredNews.length === 0) {
        displayNoNews(newsSection);
        return;
    }

    const newsHTML = filteredNews.map(item => createNewsCard(item)).join('');
    newsSection.innerHTML = newsHTML;
}

function filterAndSortNews(news, filter) {
    let filteredNews = filter !== 'Latest' 
        ? news.filter(item => item.type === filter)
        : news;

    return filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function displayNoNews(container) {
    container.innerHTML = '<p class="no-news">No news items found.</p>';
}

function createNewsCard(newsItem) {
    return `
        <article class="news-card">
            ${createNewsHeader(newsItem)}
            <div class="news-content">
                ${createNewsContent(newsItem)}
            </div>
        </article>
    `;
}

function createNewsHeader(newsItem) {
    const date = formatDate(newsItem.date);
    return `
        <div class="news-header">
            <h3>${newsItem.title}</h3>
            <div class="news-meta">
                <span class="news-type">${newsItem.type}</span>
                <span class="news-date">${date}</span>
            </div>
        </div>
    `;
}

function createNewsContent(newsItem) {
    return Array.isArray(newsItem.details)
        ? createQAContent(newsItem)
        : createStandardContent(newsItem);
}

function createQAContent(newsItem) {
    const qaDetail = newsItem.details[0];
    return `
        <div class="news-qa">
            <h4>${qaDetail.question}</h4>
            <p class="team-name">${qaDetail.team}</p>
            <p>${qaDetail.answer.substring(0, 200)}...</p>
            ${createNewsImage(qaDetail)}
        </div>
        ${createReadMoreButton(newsItem.url)}
    `;
}

function createStandardContent(newsItem) {
    return `
        <p>${newsItem.details}</p>
        ${createNewsImage(newsItem)}
    `;
}

function createNewsImage(item) {
    return item.image 
        ? `<img src="${item.image}" alt="${item.imageAlt}" class="news-image" width="300" loading="lazy">`
        : '';
}

function createReadMoreButton(url) {
    return url
        ? `<div class="news-actions">
            <a href="${url}" class="read-more-btn">Read Full Article</a>
           </div>`
        : '';
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);
}

// Error handling
function displayError(message) {
    const newsSection = document.querySelector('main section');
    newsSection.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
        </div>
    `;
}
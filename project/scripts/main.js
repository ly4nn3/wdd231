import { displayDates } from './modules/dates.js';
import { initializeNavigation } from './modules/menu.js';
import { initializeVisitCounter } from './modules/visits.js';
import { initializeHomePage } from './modules/index.js';
import { initializeCompendium } from './modules/compendium.js';
import { initializeEvents } from './modules/events.js';
import { initializeNews } from './modules/news.js';
import { displayFormData } from './modules/thankyou.js';

document.addEventListener('DOMContentLoaded', () => {
    displayDates();
    initializeNavigation();
    initializeVisitCounter();
    

    const currentPage = document.body.dataset.page;
    switch(currentPage) {
        case 'home':
            initializeHomePage();
            break;
        case 'compendium':
            initializeCompendium();
            break;
        case 'events':
            initializeEvents();
            break;
        case 'news':
            initializeNews();
            break;
        case 'thankyou':
            displayFormData();
            break;
    }
});
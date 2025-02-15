const TYPE_MAP = {
    "Miracle Outfit": "Miracle",
    "Ability Outfit": "Ability",
    "Stylish Outfit": "Stylish",
    "Momo's Cloak": "Momo",
    "Other": "Other"
};

export async function initializeCompendium() {
    try {
        const outfits = await fetchOutfits();
        setupFilterButtons();
        displayOutfits(outfits);
    } catch (error) {
        console.error('Error initializing compendium:', error);
        displayError('Failed to load outfits. Please try again later.');
    }
}

async function fetchOutfits() {
    try {
        const response = await fetch('./data/outfits.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch outfits: ${error.message}`);
    }
}

// Filter setup
function setupFilterButtons() {
    const buttons = document.querySelectorAll('aside button');
    let activeFilters = {
        style: null,
        type: null
    };

    buttons.forEach(button => {
        button.className = 'filter-btn';
        
        button.addEventListener('click', async () => {
            const buttonGroup = button.parentElement.querySelector('p').textContent.toLowerCase();
            const siblings = button.parentElement.querySelectorAll('button');
            
            handleFilterClick(button, siblings, buttonGroup, activeFilters);

            const outfits = await fetchOutfits();
            displayOutfits(outfits, activeFilters);
        });
    });
}

function handleFilterClick(button, siblings, buttonGroup, activeFilters) {
    if (button.classList.contains('active')) {
        button.classList.remove('active');
        activeFilters[buttonGroup === 'styles' ? 'style' : 'type'] = null;
    } else {
        siblings.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        activeFilters[buttonGroup === 'styles' ? 'style' : 'type'] = button.textContent;
    }
}

function displayOutfits(outfits, filters = { style: null, type: null }) {
    const section = document.querySelector('.outfits-container');
    const filteredOutfits = filterOutfits(outfits, filters);

    if (filteredOutfits.length === 0) {
        displayNoOutfits(section);
        return;
    }

    displayOutfitGrid(section, filteredOutfits);
}

function filterOutfits(outfits, filters) {
    let filtered = outfits;
    
    if (filters.style) {
        filtered = filtered.filter(outfit => outfit.style === filters.style);
    }
    
    if (filters.type) {
        filtered = filtered.filter(outfit => outfit.type === TYPE_MAP[filters.type]);
    }

    return filtered;
}

function displayNoOutfits(section) {
    section.innerHTML = '<p class="no-outfits">No outfits found matching the selected filters.</p>';
}

function displayOutfitGrid(section, outfits) {
    const outfitsHTML = `
        <div class="outfit-grid">
            ${outfits.map(outfit => createOutfitCard(outfit)).join('')}
        </div>
    `;
    
    section.innerHTML = outfitsHTML;
}

function createOutfitCard(outfit) {
    const qualityDisplay = getQualityDisplay(outfit);
    return `
        <article class="outfit-card">
            ${createOutfitImage(outfit)}
            ${createOutfitContent(outfit)}
        </article>
    `;
}

function getQualityDisplay(outfit) {
    return outfit.type === "Momo" ? '🐱' : '★'.repeat(outfit.quality);
}

function createOutfitImage(outfit) {
    return `
        <div class="outfit-image">
            <img src="${outfit.image}" alt="${outfit.imageAlt}" width="300" loading="lazy">
            <span class="outfit-quality ${outfit.type === "Momo" ? 'momo-quality' : ''}">${getQualityDisplay(outfit)}</span>
            ${outfit.type !== "Momo" && outfit.ability && outfit.ability !== "none" ? 
                `<span class="outfit-ability">${outfit.ability}</span>` : 
                ''}
        </div>
    `;
}

function createOutfitContent(outfit) {
    return `
        <div class="outfit-content">
            <h3>${outfit.name}</h3>
            ${outfit.type !== "Momo" ? createOutfitMeta(outfit) : ''}
            <p class="outfit-description">${outfit.description}</p>
            ${outfit.type !== "Momo" ? createOutfitLabels(outfit) : ''}
            <div class="outfit-banner">${outfit.banner}</div>
        </div>
    `;
}

function createOutfitMeta(outfit) {
    return `
        <div class="outfit-meta">
            <span class="outfit-style ${outfit.style.toLowerCase()}">${outfit.style}</span>
            ${outfit.type !== "Other" ? 
                `<span class="outfit-type">${outfit.type}</span>` : 
                ''}
        </div>
    `;
}

function createOutfitLabels(outfit) {
    return `
        <div class="outfit-labels">
            ${outfit.label.map(label => `<span class="label">${label}</span>`).join('')}
        </div>
    `;
}

function displayError(message) {
    const section = document.querySelector('main section');
    section.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
        </div>
    `;
}
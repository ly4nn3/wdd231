const DATE_FORMAT_OPTIONS = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};

const THANK_YOU_MESSAGE = {
    title: 'Thank You for Subscribing to the Freeway Letter!',
    confirmation: 'Your very first Freeway Letter will be arriving shortly.',
    additionalInfo: 'Keep an eye on your inbox for exclusive updates and news!'
};

export function parseFormData() {
    const queryString = getQueryString();
    if (!queryString) return null;

    const formData = queryString.split('&');
    return {
        name: extractParameter(formData, 'name'),
        email: extractParameter(formData, 'email'),
        date: formatCurrentDate()
    };
}

function getQueryString() {
    const currentUrl = window.location.href;
    return currentUrl.split('?')[1];
}

function extractParameter(formData, paramName) {
    let result = '';
    formData.forEach((element) => {
        if (element.startsWith(paramName)) {
            result = element.split('=')[1]
                .replace("%40", "@")
                .replaceAll("+", " ");
        }
    });
    return result;
}

function formatCurrentDate() {
    return new Date().toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);
}

export function displayFormData() {
    const formData = parseFormData();
    if (!formData) return;

    const container = document.querySelector('.thankyou');
    if (!container) return;

    container.innerHTML = createThankYouMessage(formData);
}

function createThankYouMessage(formData) {
    return `
        <h2>${THANK_YOU_MESSAGE.title}</h2>
        <div class="subscription-details">
            <p><strong>Nickname:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
            <p><strong>Subscription Date:</strong><br>${formData.date}</p>
        </div>
        <div class="confirmation-message">
            <p>${THANK_YOU_MESSAGE.confirmation}</p>
            <p>${THANK_YOU_MESSAGE.additionalInfo}</p>
        </div>
    `;
}
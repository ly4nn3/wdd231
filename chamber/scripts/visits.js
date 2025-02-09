document.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();

    function getDaysBetween(date1, date2) {
        const days = (date2 - date1) / (1000 * 60 * 60 * 24);
        return Math.floor(days);
    }

    function getVisitMessage(lastVisitDate) {
        if (!lastVisitDate) {
            return "Welcome! Let us know if you have any questions.";
        }

        const daysBetween = getDaysBetween(lastVisitDate, currentDate);

        if (daysBetween < 1) {
            return "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            return "You last visited 1 day ago.";
        } else {
            return `You last visited ${daysBetween} days ago.`;
        }
    }

    messageElement.textContent = getVisitMessage(lastVisit);
    localStorage.setItem('lastVisit', currentDate);
});
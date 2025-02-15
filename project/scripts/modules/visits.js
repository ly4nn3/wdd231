const TOAST_DISPLAY_TIME = 4000; // 4 seconds
const TOAST_MESSAGES = {
    firstVisit: "Welcome to Nikki's Freeway!",
    returningVisit: (count) => `Welcome back! You've visited ${count} times.`
};

export function initializeVisitCounter() {
    const toast = document.getElementById("visit-toast");
    if (!toast) return;

    const visitData = getVisitData();
    const today = getCurrentDate();

    if (shouldUpdateVisit(visitData.lastVisitDate, today)) {
        const updatedCount = updateVisitCount(visitData.count);
        updateLocalStorage(updatedCount, today);
        displayToast(toast, updatedCount);
    }
}

function getVisitData() {
    return {
        count: parseInt(localStorage.getItem("visitCount")) || 0,
        lastVisitDate: localStorage.getItem("lastVisitDate") || ""
    };
}

function updateVisitCount(currentCount) {
    return currentCount + 1;
}

function updateLocalStorage(count, date) {
    localStorage.setItem("visitCount", count);
    localStorage.setItem("lastVisitDate", date);
}

function getCurrentDate() {
    return new Date().toISOString().split("T")[0];
}

function shouldUpdateVisit(lastVisitDate, currentDate) {
    return lastVisitDate !== currentDate;
}

function displayToast(toastElement, visitCount) {
    const isFirstVisit = visitCount === 1;
    
    configureToast(toastElement, {
        message: isFirstVisit 
            ? TOAST_MESSAGES.firstVisit 
            : TOAST_MESSAGES.returningVisit(visitCount),
        className: isFirstVisit ? "first-visit" : "returning-visit"
    });

    showToast(toastElement);
}

function configureToast(toastElement, { message, className }) {
    toastElement.textContent = message;
    toastElement.classList.add(className);
}

function showToast(toastElement) {
    toastElement.classList.add("show");

    setTimeout(() => {
        toastElement.classList.remove("show");
    }, TOAST_DISPLAY_TIME);
}
const currentUrl = window.location.href;
const everything = currentUrl.split('?');
let formData = everything[1].split('&');

function show(param) {
    let result = '';
    formData.forEach((element) => {
        if (element.startsWith(param)) {
            result = element.split('=')[1].replace("%40", "@").replaceAll("+", " ");
        }
    });
    return result;
}

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
});

const applicationResults = document.getElementById('results');
applicationResults.innerHTML = `
    <h3>Application Details:</h3>
    <p><strong>Name:</strong> ${show('firstname')} ${show('lastname')}</p>
    <p><strong>Email:</strong> <a href="mailto:${show('email')}">${show('email')}</a></p>
    <p><strong>Phone:</strong> ${show('phone')}</p>
    <p><strong>Business Name:</strong> ${show('organization')}</p>
    <p><strong>Membership Level:</strong> ${show('membership')}</p>
    <p><strong>Submission Date:</strong><br>${formattedDate}</p>
`;
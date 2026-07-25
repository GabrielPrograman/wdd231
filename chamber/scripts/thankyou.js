const currentUrl = window.location.href;

const everythingAfterQuestionMark = currentUrl.split('?')[1];

const formData = new URLSearchParams(everythingAfterQuestionMark);

const showInfo = document.querySelector('#results');

showInfo.innerHTML = `
<p><strong>First Name:</strong> ${formData.get('first')} </p>
<p><strong>Last Name:</strong> ${formData.get('last')} </p>
<p><strong>Email:</strong> ${formData.get('email')} </p>
<p><strong>Moblie Phone:</strong> ${formData.get('phone')} </p>
<p><strong>Business Name:</strong ${formData.get('business')} </p>
<p><strong>Application Date:</strong> ${formData.get('timestamp')} </p>
`;
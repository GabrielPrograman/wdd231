import { items } from '../data/items.mjs';

const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const lastModifiedSpan = document.getElementById('last-modified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}

const menuBtn = document.getElementById('menu-btn');
const primaryNav = document.getElementById('primary-nav');

if (menuBtn && primaryNav) {
    menuBtn.addEventListener('click', () => {
        primaryNav.classList.toggle('hidden');
    });
}

const container = document.getElementById('discover-container');

function displayItems(places) {
    container.innerHTML = '';
    places.forEach(place => {
        const card = document.createElement('article');
        card.className = 'discover-card';
        card.innerHTML = `
            <figure>
                <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
            </figure>
            <h2>${place.name}</h2>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-btn">Learn More</button>
        `;

        const learnBtn = card.querySelector('.learn-btn');
        learnBtn.addEventListener('click', () => {
            alert(`You want to learn more  about ${place.name}? Feature coming soon!`);
        });

        
        container.appendChild(card);
    });
}

const visitMessageElement = document.getElementById('visit-message');
const now = Date.now();
const lastVisit = localStorage.getItem('lastVisit');

const msInDay = 84600000; // Milliseconds in a day

if (visitMessageElement) {
if (!lastVisit) {
    visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = now - parseInt(lastVisit);

    if (timeDifference < msInDay) {
        visitMessageElement.textContent = "Back so soon! Awesome";
    } else {
        const daysAgo = Math.floor(timeDifference / msInDay);
        visitMessageElement.textContent = `You last visited ${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago.`;
    }
}
}

localStorage.setItem('lastVisit', now.toString());

displayItems(items);

import { getCurrentYear, formatDistance } from './module.js';

const routesUrl = 'data/routes.json';
const routesContainer = document.querySelector('#routes-container');
const modal = document.querySelector('#info-modal');
const closeModalBtn = document.querySelector('#close-modal');
const menuButton = document.querySelector('#menu-button');
const navMenu = document.querySelector('#nav-menu');

const yearElement = document.querySelector('#year');
if (yearElement) {
    yearElement.textContent = getCurrentYear();
}

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
    });
}

function handleVisitCount() {
    const visitDisplay = document.querySelector('#visit-count');
    if (!visitDisplay) return;

    let visits = Number(window.localStorage.getItem('citypedal-visits-ls')) || 0;
    visits++;
    window.localStorage.setItem('citypedal-visits-ls', visits);
    visitDisplay.textContent = visits;
}

async function getRoutesData() {
    if (!routesContainer) return;

    try {
        const response = await fetch(routesUrl);
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${response.status}');
        }
        const data = await response.json();

        displayRoutes(data.slice(0, 15));
    } catch (error) { 
        console.error('Failed to fetch route data:', error);
        routesContainer.innerHTML = '<p>Unable to load cycling routes at this time. Please try again later.</p>';
    }
}

function displayRoutes(routes) {
    routesContainer.innerHTML = '';

    routes.forEach(route => {
        const card = document.createElement('div');
        card.classList.add('card');

        const descriptionText = route.desc ? (route.desc.length > 60 ? route.desc.substring(0, 60) + '...' : route.desc) : 'No description available.';

        card.innerHTML = `
           <h3>${route.name}</h3>
           <p><strong>Difficulty Level:</strong> ${route.level}</p>
           <p><strong>${formatDistance(route.distance)}</strong></p>
           <p>${descriptionText}</p>
           <button class="details-btn" data-id="${route.id}">Views Details</button>
        `;

        routesContainer.appendChild(card);
    });

    const detailButtons = document.querySelectorAll('.details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const routeId = e.target.getAttribute('data-id');
            openRouteModal(routeId, routes);
        });
    });
}

function openRouteModal(id, routes) {
    const selectedRoute = routes.find(item => item.id == id);

    if (selectedRoute && modal) {
        document.querySelector('#modal-title').textContent = selectedRoute.name;
        document.querySelector('#modal-level').textContent = selectedRoute.level;
        document.querySelector('#modal-distance').textContent = selectedRoute.distance;
        document.querySelector('#modal-desc').textContent = selectedRoute.desc;
         modal.showModal();
    }
}

if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });
}

handleVisitCount();
getRoutesData();